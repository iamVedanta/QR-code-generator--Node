//add type =  module in package.json for using import 

import inquirer from 'inquirer';

import qr from 'qr-image';

import fs from 'fs';


inquirer
  .prompt([
    {message:"type in your url",
    name:"URL"}
  ])
  .then((answers) => {
    const url = answers.URL;
    console.log(url);


    var domain = (new URL(url)).hostname.split('.')[0]
    console.log(domain)
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream(`${String(domain)}.png`));


    fs.writeFile("url_data.txt",url,(err)=>{
        if (err) throw err;
        console.log("Yay!The file has been saved!");
    })

 
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      
      console.log("Something is not right!")
    }
  });

