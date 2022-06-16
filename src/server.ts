import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import fs from "fs";
import path from 'path';
(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  app.get("/filteredimage/",async (req:Request, res:Response) => {
    const { image_url } = req.query;
    console.log(req.query);
    if (!image_url){
      res.status(400).send("Image URL query required")
    }
    if (image_url){
      try{
        const filtered_path = await filterImageFromURL(image_url);
        return res.status(200).sendFile(filtered_path);
      }
      catch{
        res.status(422).send("Invalid Image URL.The server cannot process the image URL provided")
      } 
      finally{
        // Timeout function set to 15 seconds after response is sent
        const deleteTimeout = setTimeout(deleteTempFiles, 15000);
      } 
    }

  })
  //Timeout function to delete all files in the tmp directory
  function deleteTempFiles(){
    const folderPath = __dirname + "/util/tmp/";
        //created an array to get the paths to all the files created by the server
        const tmpArray = 
          fs.readdirSync(folderPath).map(fileName => {
            return path.join(folderPath, fileName);
          });
        deleteLocalFiles(tmpArray);
  }
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req: Request, res: Response ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();