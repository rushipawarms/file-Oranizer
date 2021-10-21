const { lstatSync } = require("fs");

let inputArray=process.argv.slice(2);
fs=require("fs");
path=require("path");
let Dpath;
let types={
    media:["mp4","mp3"],
    achivers:["zip","tar"],
    doc:["json","txt","pdf"],
    app:["exe"]
}
let command =inputArray[0];
switch (command){
    case "organize":
        funOrg(inputArray[1]);
        break;
    case "tree":
        funTree(inputArray[1]);
        break;
    case "help":
        console.log(`
        Enter below options
        1) organize "filePath"
        2) tree "filePath"
        3)help
        `)
        break;
    default:
        console.log("Enter a correct command");
}
function funOrg(filePath)

{
    if(filePath==undefined)
    {
        console.log("enter file path");
        return;
    }
    else{
        let exist=fs.existsSync(filePath);
        if(exist)
        {
             Dpath=path.join(filePath,"Oranize_file");
            if(fs.existsSync(Dpath)==false)
            {
                fs.mkdirSync(Dpath);
            }
           
        }
        else{
            console.log("filePath is not exist");
            return;
        }
    }
   
    orgHelp(filePath,Dpath);
}

function  orgHelp(src,dest)
{
    let childfiles=fs.readdirSync(src);
    for( let i=0;i<childfiles.length;i++)
    {
        let childpath=path.join(src,childfiles[i]);
       
        let isfile=fs.lstatSync(childpath).isFile();
        if(isfile)
        {
           let catagory=getCatagory(childfiles[i]);
           let catpath=path.join(dest,catagory);
           if(fs.existsSync(catpath)==false)
           {
            fs.mkdirSync(catpath);
           }
           let destfilepath=path.join(catpath,childfiles[i]);
           fs.copyFileSync(childpath,destfilepath); 
           fs.unlinkSync(childpath);
        }
    }
}

function getCatagory(childfile)
{
    let ext=path.extname(childfile);
    ext=ext.slice(1);
    for(let type in types)
    {
        let ct=types[type];
        for(let j=0;j<ct.length;j++)
        {
            if(ext==ct[j])
            {
                return type;
            }
        }
    }
    return other;
}

function funTree(filePath)
{
    if(filePath==undefined)
    {
        console.log("enter file path");
        return;
    }
    else{
        let exist=fs.existsSync(filePath);
        if(exist)
        {
            treehelper(filePath,"");
           
        }
        else{
            console.log("filePath is not exist");
            return;
        }
    }
}

function treehelper(filePath, ind)
{
    
   let stat=fs.statSync(filePath);
  
   if(stat.isFile()==true)
   {
       let filename=path.basename(filePath);
       console.log(ind+"|----"+filename);
   }
   else{
    
       let dirname=path.basename(filePath);
       console.log(ind+"|____"+dirname);
       let childs=fs.readdirSync(filePath);
       for(let i=0;i<childs.length;i++)
       {
           let childpa=path.join(filePath,childs[i]);
           treehelper(childpa,ind+"\t");
       }
   }
}