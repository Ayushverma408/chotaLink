const express = require('express')
const mongoose = require('mongoose')
const crypto = require('crypto')

const Url = require('../models/urlmodel')

const createUniqueShortUrl = () => {
    return crypto.randomBytes(3).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0,6);
}
    const createChotaUrl = async (req, res) => {
        const { originalUrl } = req.body;
        console.log(originalUrl)
        console.log(req.body)
        // Validate input
        if (!originalUrl) {
            return res.status(400).json({ message: "Original URL is required" });
        }
    
        try {
            // Check if the URL already exists in the database
            console.log("inside the function")
            const isOriginalPresent = await Url.exists({ originalUrl });
            console.log(`isOriginalPresent: ${isOriginalPresent}`)
            if (isOriginalPresent || isOriginalPresent != null) {
                return res.status(200).json({
                    message: "This URL already exists!",
                    data: isOriginalPresent,  // Optionally return the existing data
                });
            }
    
            // Generate a unique short URL
            let chotaUrl = createUniqueShortUrl();  // Assuming this function returns a unique URL
            console.log(`chotaUrl: ${chotaUrl}`)
            let retries = 0;
            const maxRetries = 10;  // Set a max retry count to prevent infinite loop
    
            // Check if the short URL already exists in the database and regenerate if necessary
            while (retries < maxRetries) {
                const existingShortUrl = await Url.findOne({ chotaUrl });
                if (!existingShortUrl || existingShortUrl != null) {
                    break;  // Unique URL found, exit the loop
                }
                chotaUrl = createUniqueShortUrl();  // Regenerate short URL
                retries++;
            }
    
            if (retries === maxRetries) {
                return res.status(500).json({ message: "Failed to generate unique short URL after multiple retries" });
            }
    
            // Save the new URL and its short URL to the database
            const newUrl = await Url.create({ originalUrl, chotaUrl });
            res.status(201).json({ message: `Short URL created: ${chotaUrl}`, data: newUrl });
    
        } catch (err) {
            console.error("Error creating short URL:", err);
            res.status(500).json({ message: "Server Error!", error: err.message });
        }
    };

const redirectkarochotaurl = async(req, res) => {
    const {chotaurl} = req.params;
    console.log(chotaurl)
    
    try{
    const url = await Url.findOne({chotaUrl: chotaurl})
    console.log(url)
    
    if(url){
        console.log(`redirecting to: ${url.originalUrl}`)
        return res.redirect(url.originalUrl)
    }
    else{
        return res.status(400).json({message: `url not found ${chotaurl}`})
    }
}
    catch(err){
        res.status(500).json({message: "server error"})
    } 
}
module.exports = {
  createChotaUrl,
  redirectkarochotaurl
};