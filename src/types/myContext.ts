import * as DataLoader from "dataloader";
import { Request, Response } from "express";
import { Tweet } from "src/tweet/entities/tweet.entity";

export interface MyContext{
    req: Request,
    res: Response,
    tweetLoader: DataLoader<number, Tweet[]>
}