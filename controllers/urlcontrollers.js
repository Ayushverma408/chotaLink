const express = require('express')
const mongoose = require('mongoose')
const crypto = require('crypto')

const Url = require('../models/urlmodel')

const createUniqueShortUrl = () => {
    return crypto.randomBytes(3).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0,6);
}

const createChotaUrl = async(req, res) => {
   const {originalUrl} = req.body
    if (!originalUrl) {
        return res.status(400).json({ message: "Original URL is required" });
    }
    try{
        const isOriginalPresent = await Url.findOne({originalUrl})
        if(isOriginalPresent)
        {
            return res.status(200).json({
                message: "This URL already exists!",
            })
        }

        const chotaUrl = createUniqueShortUrl()
        
        let isUnique = false
        while(!isUnique)
        {
            let existingShortUrl = await Url.findOne({chotaUrl})
            if (!existingShortUrl) isUnique = true
        }

        const newUrl = await Url.create({originalUrl, chotaUrl})
        res.status(200).json({message: `shortUrl created ${chotaUrl}`, data: newUrl})
    }
    catch(err){
        res.status(500).json({message: "Server Error!", error: err.message})
    }
}

const redirectKaroChotaUrl = async(req, res) => {
    res.send("this is created")
} 


module.exports = {
  createChotaUrl,
  redirectKaroChotaUrl
};