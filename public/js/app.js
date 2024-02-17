let options = document.querySelectorAll('input')
const url = "http://172.16.128.90:3000/postQ"
//let button = document.querySelector('Submit')
let va=0
let pi=0
let ka=0
button.addEventListener('click',async function(){
  options.forEach(e=>{
    if(e.checked)
    {
        let i= parseInt(e.name)
        if(e.value==='v')
        {
          va++
        }else if(e.value==='k'){
          pi++
        }
        else{
          ka++
        }
    }
   })
   console.log(`${va} ${pi} ${ka}`)
   let dict = {"email":email.value,"db":dob.value,"v":va,"p":pi,"k":ka}
   await axios.post(url,dict)
   va=0
   pi=0
   ka=0
   
 })
 

