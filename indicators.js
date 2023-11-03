const { log, error } = console;
import tulind from 'tulind';
import { promisify } from 'util';

const sma_async = promisify(tulind.indicators.sma.indicator);
const ema_async = promisify(tulind.indicators.ema.indicator);
const rsi_async = promisify(tulind.indicators.rsi.indicator);
const macd_async = promisify(tulind.indicators.macd.indicator);
const bbands_async = promisify(tulind.indicators.bbands.indicator);
const adx_async = promisify(tulind.indicators.adx.indicator);
const psar_async = promisify(tulind.indicators.psar.indicator);
const aroon_async = promisify(tulind.indicators.aroon.indicator);
const atr_async = promisify(tulind.indicators.atr.indicator);
const cci_async = promisify(tulind.indicators.cci.indicator);
const fisher_async = promisify(tulind.indicators.fisher.indicator);
const dema_async = promisify(tulind.indicators.dema.indicator);
const hma_async = promisify(tulind.indicators.hma.indicator);
const kama_async = promisify(tulind.indicators.kama.indicator);
const mfi_async = promisify(tulind.indicators.mfi.indicator);
const obv_async = promisify(tulind.indicators.obv.indicator);
const stoch_async = promisify(tulind.indicators.stoch.indicator);
const stochrsi_async = promisify(tulind.indicators.stochrsi.indicator);
const tema_async = promisify(tulind.indicators.tema.indicator);
const trix_async = promisify(tulind.indicators.trix.indicator);
const willr_async = promisify(tulind.indicators.willr.indicator);
const wema_async = promisify(tulind.indicators.wma.indicator);

const bbands_inc = async (data, period, stddev) => {
    const d1 = data.map((d) => d.close);
    const results = await bbands_async([d1], [period, stddev]);
    const d2 = results[0];
    const diff = data.length - results[0].length;
    const emptyArray = [...new Array(diff)].map((d) => '');

    const bbands1 = [...emptyArray, ...results[0]];
    const bbands2 = [...emptyArray, ...results[1]];
    const bbands3 = [...emptyArray, ...results[2]];

    data = data.map((d, i) => ({
        ...d,
        bbands_fast: bbands1[i],
        bbands_slow: bbands2[i],
        bbands_histogram: bbands3[i],
    }));
    return data;

}

const sma_inc = async (data, period) => {
    const d1 = data.map((d) => d.close);
    const results = await sma_async([d1], [period]);
    const d2 = results[0];
    const diff = data.length - d2.length;
    const emptyArray = [...new Array(diff)].map((d) => '');
    const d3 = [...emptyArray, ...d2];
    data = data.map((d, i) => ({ ...d, sma: d3[i] }));
    return data;
};

const ema_inc = async (data, period) => {
    const d1 = data.map((d) => d.close);
    const results = await ema_async([d1], [period]);
    const d2 = results[0];
    const diff = data.length - d2.length;
    const emptyArray = [...new Array(diff)].map((d) => '');
    const d3 = [...emptyArray, ...d2];
    data = data.map((d, i) => ({ ...d, ema: d3[i] }));
    return data;
};

const rsi_inc = async (data,period) => {
    const d1 = data.map((d) => d.close);
    const results = await rsi_async([d1], [period]);
    const d2 = results[0];
    const diff = data.length - d2.length;
    const emptyArray = [...new Array(diff)].map((d) => '');
    const d3 = [...emptyArray, ...d2];
    data = data.map((d, i) => ({ ...d, rsi: d3[i] }));
    return data;
};

const rsisec_inc = async (data, period) => {
    const d1 = data.map((d) => d.close);
    const results = await rsi_async([d1], [period]);
    const d2 = results[0];
    const diff = data.length - d2.length;
    const emptyArray = [...new Array(diff)].map((d) => '');
    const d3 = [...emptyArray, ...d2];
    data = data.map((d, i) => ({ ...d, rsisec: d3[i] }));
    return data;
};

const markers_inc = (data) => {
    //EMA21 CROSSOVER SMA100 - LONG
    //EMA21 CROSSUNDER SMA100 - SHORT
    data = data.map((d, i, arr) => {
        const long =
            arr[i]?.ema > arr[i]?.sma && arr[i - 1]?.ema < arr[i - 1]?.sma
                ? true
                : false;
        const short =
            arr[i]?.ema < arr[i]?.sma && arr[i - 1]?.ema > arr[i - 1]?.sma
                ? true
                : false;
        return { ...d, long, short };
    });
    return data;
};

const macd_inc = async (data) => {
    const d1 = data.map((d) => d.close);
    const results = await macd_async([d1], [12, 26, 9]);
    const diff = data.length - results[0].length;
    const emptyArray = [...new Array(diff)].map((d) => '');

    const macd1 = [...emptyArray, ...results[0]];
    const macd2 = [...emptyArray, ...results[1]];
    const macd3 = [...emptyArray, ...results[2]];

    data = data.map((d, i) => ({
        ...d,
        macd_fast: macd1[i],
        macd_slow: macd2[i],
        macd_histogram: macd3[i],
    }));
    return data;
};

const adx_inc = async (data, period) => {
    const d1 = data.map((d) => d.close);
    const d2 = data.map((d) => d.high);
    const d3 = data.map((d) => d.low);
    const results = await adx_async([d2, d3, d1], [period]);
    const d4 = results[0]
    const diff = data.length - d4.length;
    const emptyArray = [...new Array(diff)].map((d) => '');
    const d5 = [...emptyArray, ...d4];
    data = data.map((d, i) => ({ ...d, adx: d5[i] }));
    return data;
}

const psar_inc = async (data, aceleration, maximum) => {
    const d1 = data.map((d) => d.high);
    const d2 = data.map((d) => d.low);
    const results = await psar_async([d1, d2], [aceleration, maximum]);
    const d3 = results[0];
    const diff = data.length - d3.length;
    const emptyArray = [...new Array(diff)].map((d) => '');
    const d4 = [...emptyArray, ...d3];
    data = data.map((d, i) => ({ ...d, psar: d4[i] }));
    return data;
}

const aroon_inc = async (data, period) => {
    const d1 = data.map((d) => d.high);
    const d2 = data.map((d) => d.low);
    const results = await aroon_async([d1, d2], [period]);
    const diff = data.length - results[0].length;
    const emptyArray = [...new Array(diff)].map((d) => '');

    const aroon_down = [...emptyArray, ...results[0]];
    const aroon_up = [...emptyArray, ...results[1]];

    data = data.map((d, i) => ({
        ...d,
        aroon_down: aroon_down[i],
        aroon_up: aroon_up[i],

    }));
    return data;
}

const atr_inc = async (data, period) => {
    const d1 = data.map((d) => d.close);
    const d2 = data.map((d) => d.high);
    const d3 = data.map((d) => d.low);
    const results = await atr_async([d2, d3, d1], [period]);
    const d4 = results[0]
    const diff = data.length - d4.length;
    const emptyArray = [...new Array(diff)].map((d) => '');
    const d5 = [...emptyArray, ...d4];
    data = data.map((d, i) => ({ ...d, atr: d5[i] }));
    return data;
}

const cci_inc = async (data, period) => {
    const d1 = data.map((d) => d.close);
    const d2 = data.map((d) => d.high);
    const d3 = data.map((d) => d.low);
    const results = await cci_async([d2, d3, d1], [period]);
    const d4 = results[0]
    const diff = data.length - d4.length;
    const emptyArray = [...new Array(diff)].map((d) => '');
    const d5 = [...emptyArray, ...d4];
    data = data.map((d, i) => ({ ...d, cci: d5[i] }));
    return data;
}

const fisher_inc = async (data, period) => {
    const d1 = data.map((d) => d.high);
    const d2 = data.map((d) => d.low);
    const results = await fisher_async([d1, d2], [period]);
    const d4 = results[0]
    const diff = data.length - d4.length;
    const emptyArray = [...new Array(diff)].map((d) => '');
    const fisher = [...emptyArray, ...results[0]];
    const fisher_signal = [...emptyArray, ...results[1]];

    data = data.map((d, i) => ({
        ...d,
        fisher: fisher[i],
        fisher_signal: fisher_signal[i],

    }));
    return data;
    
}

const dema_inc = async (data) => {
    const d1 = data.map((d) => d.close);
    const results = await dema_async([d1], [9]);
    const d2 = results[0];
    const diff = data.length - d2.length;
    const emptyArray = [...new Array(diff)].map((d) => '');
    const d3 = [...emptyArray, ...d2];
    data = data.map((d, i) => ({ ...d, dema: d3[i] }));
    return data;
}
const hma_inc = async (data) => {
    const d1 = data.map((d) => d.close);
    const results = await hma_async([d1], [9]);
    const d2 = results[0];
    const diff = data.length - d2.length;
    const emptyArray = [...new Array(diff)].map((d) => '');
    const d3 = [...emptyArray, ...d2];
    data = data.map((d, i) => ({ ...d, hma: d3[i] }));
    return data;
}
const kama_inc = async (data) => {
    const d1 = data.map((d) => d.close);
    const results = await kama_async([d1], [17]);
    const d2 = results[0];
    const diff = data.length - d2.length;
    const emptyArray = [...new Array(diff)].map((d) => '');
    const d3 = [...emptyArray, ...d2];
    data = data.map((d, i) => ({ ...d, kama: d3[i] }));
    return data;
}
const mfi_inc = async (data, period) => {
    const d1 = data.map((d) => d.close);
    const d2 = data.map((d) => d.high);
    const d3 = data.map((d) => d.low);
    const d4 = data.map((d) => d.volume);
    const results = await mfi_async([d2, d3, d1, d4], [period]);
    const d5 = results[0]
    const diff = data.length - d5.length;
    const emptyArray = [...new Array(diff)].map((d) => '');
    const d6 = [...emptyArray, ...d5];
    data = data.map((d, i) => ({ ...d, mfi: d6[i] }));
    return data;
}
const obv_inc = async (data) => {
    const d1 = data.map((d) => d.close);
    const d2 = data.map((d) => d.volume);
    const results = await obv_async([d1], [d2]);
    const d3 = results[0]
    const diff = data.length - d3.length;
    const emptyArray = [...new Array(diff)].map((d) => '');
    const d4 = [...emptyArray, ...d3];
    data = data.map((d, i) => ({ ...d, obv: d4[i] }));
    return data;
}
const stoch_inc = async (data) => {
    const d1 = data.map((d) => d.high);
    const d2 = data.map((d) => d.low);
    const d3 = data.map((d) => d.close);
    const results = await stoch_async([d1, d2, d3], [14, 1, 3]);
    const d4 = results[0]
    const diff = data.length - d4.length;
    const emptyArray = [...new Array(diff)].map((d) => '');
    const stoch_k = [...emptyArray, ...results[0]];
    const stoch_d = [...emptyArray, ...results[1]];

    data = data.map((d, i) => ({
        ...d,
        stoch_k: stoch_k[i],
        stoch_d: stoch_d[i],

    }));
    return data;
}
const stochrsi_inc = async (data) => {
    const d1 = data.map((d) => d.close);
    const results = await stochrsi_async([d1], [14]);
    const d2 = results[0];
    const diff = data.length - d2.length;
    const emptyArray = [...new Array(diff)].map((d) => '');
    const d3 = [...emptyArray, ...d2];
    data = data.map((d, i) => ({ ...d, stochrsi: d3[i] }));
    return data;
}
const tema_inc = async (data) => {
    const d1 = data.map((d) => d.close);
    const results = await tema_async([d1], [14]);
    const d2 = results[0];
    const diff = data.length - d2.length;
    const emptyArray = [...new Array(diff)].map((d) => '');
    const d3 = [...emptyArray, ...d2];
    data = data.map((d, i) => ({ ...d, tema: d3[i] }));
    return data;
}
const trix_inc = async (data) => {
    const d1 = data.map((d) => d.close);
    const results = await trix_async([d1], [18]);
    const d2 = results[0];
    const diff = data.length - d2.length;
    const emptyArray = [...new Array(diff)].map((d) => '');
    const d3 = [...emptyArray, ...d2];
    data = data.map((d, i) => ({ ...d, trix: d3[i] }));
    return data;
}
const wema_inc = async (data) => {
    const d1 = data.map((d) => d.close);
    const results = await wema_async([d1], [14]);
    const d2 = results[0];
    const diff = data.length - d2.length;
    const emptyArray = [...new Array(diff)].map((d) => '');
    const d3 = [...emptyArray, ...d2];
    data = data.map((d, i) => ({ ...d, wema: d3[i] }));
    return data;
}
const willr_inc = async (data, period) => {
    const d1 = data.map((d) => d.high);
    const d2 = data.map((d) => d.low);
    const d3 = data.map((d) => d.close);
    const results = await willr_async([d1, d2, d3], [period]);
    const d4 = results[0]
    const diff = data.length - d4.length;
    const emptyArray = [...new Array(diff)].map((d) => '');
    const d5 = [...emptyArray, ...d4];
    data = data.map((d, i) => ({ ...d, willr: d5[i] }));
    return data;
}

export default {
    sma_inc,
    ema_inc, 
    markers_inc,
    rsi_inc,
    rsisec_inc,
    macd_inc,
    bbands_inc,
    adx_inc,
    psar_inc,
    aroon_inc,
    atr_inc,
    cci_inc,
    dema_inc,
    hma_inc,
    kama_inc,
    fisher_inc,
    mfi_inc,
    obv_inc,
    stoch_inc,
    stochrsi_inc,
    tema_inc,
    trix_inc,
    wema_inc,
    willr_inc
};