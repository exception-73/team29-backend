import axios from 'axios'; // Or `const axios = require('axios');` for CommonJS
import https from 'https'; // Add this line

export const IntradayData = async (req, res) => {
    try { 
        console.log(req.body);
        var { company_name , interval, output_size} = req.body;

        if (!company_name) {
            return res.status(400).json({
                message: "Please provide company name",
                success: false,
            });
        }

        if(!interval){
            //1, 5, 15, 30, 60
            interval = 1
        }

        if(!output_size){
            output_size = 'compact'
        }
        const fundamentalurl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${company_name}&apikey=${process.env.ALPHA_KEY2}`;
        const agent = new https.Agent({  
            rejectUnauthorized: false
        });
        // Make the API call with axios
        const fundamentalresponse = await axios.get(fundamentalurl, {httpsAgent : agent});
        const fundalmentaldata = fundamentalresponse.data;
        
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${company_name}&interval=${interval}min&output_size=${output_size}&extended_hours=false&apikey=${process.env.ALPHA_KEY2}`;


        // Create an https agent that ignores SSL certificate validation
   

        // Make the API call with axios
        const response = await axios.get(url, { httpsAgent: agent });
        const data = response.data;

        console.log(data);
       
        return res.status(200).json({
            fundalmentaldata : fundalmentaldata,
            data: data,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
}
