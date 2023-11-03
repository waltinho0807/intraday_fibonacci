const { log, error } = console;
import express from'express';
import mongoose from 'mongoose';
import  got from 'got';

//Model
const Orders = new mongoose.Schema(
  {
    buyorder: {
        type: String
    },
    sellorder: {
        type: String
    },
    price: {
        type: Number
    },
    created: {
        type: Number
    }
}
)

const Order = mongoose.model('orders', Orders);

const connectDB = async () => {
  await mongoose.connect('mongodb+srv://calegari:lauraamor4@cluster0.rz7m5.gcp.mongodb.net/?retryWrites=true&w=majority',false)
  console.log('conectado com banco')
}

const app = express();


const server = app.listen(3000, log('Proxy server is running on port 3000'));

const getBreeds = async () => {
  try {
    
    let intraday = true;;
    let calculate = false;
    let start; 
    let working;
    let trade;
    let inPosition; 
    connectDB()
    while (intraday == true) {
         
        let init = new Date();
        let hour = init.getHours()
        
        switch (start == true) {
            case trade == false:
                while(working == true){
                    const response = await got(
                        `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h`
                    );
                
                      let dados = JSON.parse(response.body);
                      
                      let klinedata = dados.map((d) => ({
                        time: d[0] / 1000,
                        open: d[1] * 1,
                        high: d[2] * 1,
                        low: d[3] * 1,
                        close: d[4] * 1,
                        volume: d[5] * 1
                      }));

                      let diff = klinedata[klinedata.length -1].high  - klinedata[klinedata.length -1].low   
                      let ratios = [-0.618, 0.618, 1.618];
                      let close = klinedata[klinedata.length -1].close;
                      let values = {};
                      let buying;
                      let fib = [];
                      let order;
                     

                      let testdate = new Date(klinedata[klinedata.length -1].time * 1000);
                      console.log(testdate)
                      let hora = testdate.getHours()
                      console.log(`Hora do candle${hora} inposition ${inPosition} calc ${calculate}`)
                      if(calculate == false && hora == 1){
                        for (let i in ratios) {
                          console.log(ratios[i]) 
                          buying = close + ratios[i] * diff; 
                          console.log(`Posição ${i}`)
                          fib.push(buying)
                          console.log(fib) 
                          inPosition = false;
                          
                        }
                        values.loss = fib[0];
                        values.buy = fib[1];
                        values.sell = fib[2]; 
                        calculate = true;
                      }

                      switch(calculate == true) {
                        case close <= values.buy && inPosition == false:
                          console.log('comprei');
                          let order  = new Order({buyorder: 'comprado', price: close})
                          await order.save()
                          inPosition = true; 
                          calculate = true;
                          break;
                        case inPosition == true && close <= values.loss:
                          console.log('perdi')
                          inPosition = false;
                          calculate = false;
                          start = false;
                          working = false;
                          break;
                        case inPosition == true && close >= values.sell:
                          console.log('ganhei')
                          inPosition = false;
                          calculate = false;
                          start = false;
                          working = false;
                          break;
                        default:
                          if(hora == 23) {
                            console.log('vou ter que vender');
                            let sellorder = new Order({buyorder: 'vendilose', price: close})
                            await sellorder.save()
                            start = false;
                            working = false; 
                            inPosition = false;
                          }
                          console.log('vai ser feito o case')
                          console.log(`a data ${testdate}`)
                          console.log(`a hora ${hora}`)
                          
                      }
                      
                }
                break;
        
            default:
              console,log('break do trade')
                break;
        }
        if(hour == 1){
          console.log('chegou aqui')
          start = true
          trade = false
          working = true
        }
        console.log(`saiu do loop ${start} trade ${trade}`)
    }


  } catch (error) {
    console.log(error)
  }
}


getBreeds()
//connectDB()