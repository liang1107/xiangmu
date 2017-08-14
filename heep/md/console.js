export default {
    alert(width,height,text){
        var div =document.createElement("div")
        var body=document.getElementsByTagName("body")[0]
        body.appendChild(div);
        div.style.width=width+"px";
         div.style.height=height+"px";
         div.style.backgroundColor="rgba(0,0,0,.4)";
        div.style.textAlign="center";
         div.style.color="#fff";
        div.style.lineHeight=height+"px";
        div.style.position="fixed"
        div.style.top="50%";
        div.style.left="50%";
         div.style.transform="translate(-"+width/2+"px,-"+height/2+"px)"
         div.style.borderRadius="5px"
         div.innerHTML=text;
        setTimeout(function(){
            div.style.display="none"
             body.removeChild(div);
        },1000)
    }
}