import {ObjectId} from "mongodb";
import TryCatch from "../middleware/trycatch.js";
import {getRestaurantCollection , getRiderCollection} from "../util/collection.js";
import { json } from "express";

export const getPendingRestaurant = TryCatch(async(req , res) => {
    const restaurants = await (await getRestaurantCollection())
    .find({sVerified : false})
    .toArray();

    res.json({
        count : restaurants.length,
        restaurants
    })
});

export const getPendingRiders = TryCatch(async(req , res) => {
    const riders = await (await getRiderCollection())
    .find({sVerified : false})
    .toArray();

    res.json({
        count : riders.length,
        riders
    })
});


export const verifyRider = TryCatch(async(req,res) => {
    const {id} = req.params;

    if(typeof id !== 'string'){
        return res.status(400).json({
            message : "invalid rider  id"
        })
    }

    if(!ObjectId.isValid(id)){
        return res.status(400).json({
            message : "invalid object id"
        });
    }

    const result = await ((await getRiderCollection()).updateOne(
        {_id : new ObjectId(id)},
        {
            $set : {
                isVerified : true,
                updatedAt : new Date()
            }
        }
    ));

    if(result.matchedCount === 0){
        return res.status(404).json({
            message : "Rider not found"
        })
    }

    res.json({
        message : "Rider verified successfully"
    })
})


export const verifyRestaurant = TryCatch(async(req,res) => {
    const {id} = req.params;

    if(typeof id !== 'string'){
        return res.status(400).json({
            message : "invalid restaurant id"
        })
    }

    if(!ObjectId.isValid(id)){
        return res.status(400).json({
            message : "invalid object id"
        });
    }

    const result = await ((await getRestaurantCollection()).updateOne(
        {_id : new ObjectId(id)},
        {
            $set : {
                isVerified : true,
                updatedAt : new Date()
            }
        }
    ));

    if(result.matchedCount === 0){
        return res.status(404).json({
            message : "Restaurant not found"
        })
    }

    res.json({
        message : "Restaurant verified successfully"
    })
})