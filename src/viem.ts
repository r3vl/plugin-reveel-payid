import axios from 'axios';
import { Client, createPublicClient, createWalletClient, http, parseEther, parseGwei, Transaction } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { estimateGas } from 'viem/actions';
import { mainnet, polygon, bsc, base, optimism } from 'viem/chains'

export const tokenDecimalsMapper = {
    ETH: 18,
    USDT: 6,
    USDC: 6,
    BNB: 18,
    POL: 18,
};

export const chainsMapper = {
    ETH: 1,
    POL: 137,
    BNB: 56,
    BASE: 8453,
    OP: 10,
};

const chainInstanceMapper = {
    [mainnet.id]: mainnet,
    [polygon.id]: polygon,
    [bsc.id]: bsc,
    [base.id]: base,
    [optimism.id]: optimism
}

const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`) 

const client = (_chain: keyof typeof chainsMapper) => {
    const chain = chainInstanceMapper[chainsMapper[_chain]]

    console.log("CHAIN:::", chain, _chain)

    return {
        walletClient: createWalletClient({
        account,
        chain,
        transport: http()
    }), publicClient: createPublicClient({ 
        chain,
        transport: http()
      })
    }
}

export async function setOptimalGas(chainId: number, priority = "medium") {
  let maxFeePerGas = BigInt("80000000000");
  let maxPriorityFeePerGas = BigInt("40000000000");
  let baseFee = BigInt(0);

  const gasStationURL = `https://gas.api.infura.io/v3/${process.env.INFURA_API_KEY}/networks/${chainId}/suggestedGasFees`;

  try {
    const { data } = await axios.get(gasStationURL);

    baseFee = parseGwei(data.estimatedBaseFee);

    maxFeePerGas = parseGwei(data[priority].suggestedMaxFeePerGas);

    // let priorityDiff =
    //   parseFloat(data[priority].suggestedMaxPriorityFeePerGas) -
    //   parseFloat(data[priority].suggestedMaxFeePerGas);

    // priorityDiff = priorityDiff > 0 ? priorityDiff / 2 : priorityDiff;

    maxPriorityFeePerGas = parseGwei(
      // countDecimalsOfAmountToSend(parseFloat(data[priority].suggestedMaxFeePerGas) + priorityDiff),
      data[priority].suggestedMaxFeePerGas,
    );
  } catch (_) {
    console.log(_);
  }

  return { maxFeePerGas, maxPriorityFeePerGas, baseFee };
}

export const getGasEstimate = async (tx: Transaction, chainId: number, client: Client) => {
  const { maxFeePerGas, maxPriorityFeePerGas } = await setOptimalGas(chainId);

  const txGasLimit = await estimateGas(client, {
    ...(tx as any),
    account: process.env.WALLET_ADDRESS,
    maxFeePerGas,
    maxPriorityFeePerGas,
  });

  return {
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit: (txGasLimit * BigInt(120)) / BigInt(100),
  };
};

export const sendTx = async (chain: keyof typeof chainsMapper, tx: any) => {
    const chainId = chainInstanceMapper[chainsMapper[chain]].id
    const { walletClient, publicClient } = client(chain)

    const parsedTx = JSON.parse(JSON.stringify(tx), (_, t) => {
        return typeof t === "string" && /^-?\d+n$/.test(t) ? BigInt(t.slice(0, -1)) : t === "0" ? BigInt(0) : t
    })
    const gasEstimate = await getGasEstimate(parsedTx, chainId, publicClient as Client)

    console.log("TX_FINAL:::", {
        ...parsedTx,
        ...gasEstimate,
    })

    const hash = await walletClient.sendTransaction({
        ...parsedTx,
        ...gasEstimate,
    })
    
    return { hash, waitReceiptPromise: publicClient.waitForTransactionReceipt({ hash }) }
}
