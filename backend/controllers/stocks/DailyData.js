
import axios from 'axios';
import https from 'https';

export const DailyData = async (req, res) => {
    try {
        console.log(req.body);
        var { company_name, output_size } = req.body;

        if (!company_name) {
            return res.status(400).json({
                message: "Please provide company name",
                success: false,
            });
        }

        if (!output_size) {
            output_size = "compact";
        }

        // Set up the URL for fundamental data
        const fundamentalurl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${company_name}&apikey=${process.env.ALPHA_KEY2}`;
        
        // Set up an HTTPS agent to bypass SSL certificate validation
        const agent = new https.Agent({
            rejectUnauthorized: false,  // Ignore invalid certificates
        });

        // Make the API call for fundamental data
        const fundamentalresponse = await axios.get(fundamentalurl, { httpsAgent: agent });
        const fundalmentaldata = fundamentalresponse.data;
        console.log(fundalmentaldata)
        // Set up the URL for daily time series data
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${company_name}&output_size=${output_size}&apikey=${process.env.ALPHA_KEY2}`;
        console.log(url);

        // Make the API call for daily data
        const response = await axios.get(url, { httpsAgent: agent });
        const data = response.data;

        console.log(data);

        return res.status(200).json({
            fundalmentaldata: fundalmentaldata,
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

