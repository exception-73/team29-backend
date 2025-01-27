import axios from 'axios'; // Or `const axios = require('axios');` for CommonJS
import https from 'https'; // Add this line

export const MonthlyData = async (req, res) => { 
    try { 
        console.log(req.body);
        var { from, to } = req.body;

        if (!from || !to) {
            return res.status(400).json({
                message: "Please provide the from and to currency symbols",
                success: false,
            });
        }


        const url = `https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=${from}&to_symbol=${to}&apikey=demo`

        console.log(url);

        // Create an https agent that ignores SSL certificate validation
        const agent = new https.Agent({  
            rejectUnauthorized: false
        });

        // Make the API call with axios
        const response = await axios.get(url, { httpsAgent: agent });
        const data = response.data;

        console.log(data);

        return res.status(200).json({
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
};
