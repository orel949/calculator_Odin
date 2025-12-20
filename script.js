function add (a,b)
{
    return a+b;
}
function substract(a,b)
{
    return a-b;
}
function multiply(a,b)
{
    return a*b;
}
function divide(a,b)
{
    if (b==0)
    {
        return 'error';
    }
    else
    {
        return a/b;
    }
}
let number1=0;
let operator;
let number2;
function operate(n1,operator,n2)
{
    switch (operator){
        case '+' :
            return add(n1,n2);
        case '-' :
            return substract(n1,n2);
        case 'x' :
            return multiply(n1,n2);
        case '/' :
            return divide(n1,n2);
        default :
            return "error";
    }
}
let variable;
let index=-1;
const barre = document.querySelector(".displayBarre");
let affichage = document.createElement("div");
affichage.textContent='0';
affichage.classList.add("barreHaut");
const res = document.createElement("div");
res.textContent='';
res.classList.add("barreBas");
barre.appendChild(affichage);
barre.appendChild(res);
const bouton = document.querySelectorAll(".touche");
bouton.forEach(touche=>{
    touche.addEventListener("click",(event)=>
    {
        variable = event.currentTarget.textContent;
        if (variable=='0' || variable=='1' || variable=='2' || variable=='3' || variable=='4' || variable=='5' || variable=='6' || 
            variable=='7' || variable=='8' || variable=='9' || variable=='.')
        {
            if (affichage.textContent!='0' && res.textContent!='Math Error' && affichage.textContent[affichage.textContent.length-2]!='=')
            {
                affichage.textContent += variable;
            }
            else if (affichage.textContent[affichage.textContent.length-2]!='=')
            {
                affichage.textContent = variable;
            }
        }
        else if (variable=='+' || variable=='-' || variable=='/' || variable=='x') 
        {
            if (res.textContent!='Math Error' && affichage.textContent[affichage.textContent.length-2]!='+'
                && affichage.textContent[affichage.textContent.length-2]!='-' && affichage.textContent[affichage.textContent.length-2]!='x'
                && affichage.textContent[affichage.textContent.length-2]!='/' && affichage.textContent[affichage.textContent.length-2]!='='
                && index==-1)
            {
                affichage.textContent += ' '+variable + ' ';
                number1=affichage.textContent.slice(0,affichage.textContent.length-3);
                operator=variable;
                index = affichage.textContent.indexOf(variable);
            }
            else if (res.textContent!='Math Error' && affichage.textContent[affichage.textContent.length-2]!='+'
                && affichage.textContent[affichage.textContent.length-2]!='-' && affichage.textContent[affichage.textContent.length-2]!='x'
                && affichage.textContent[affichage.textContent.length-2]!='/' && affichage.textContent[affichage.textContent.length-2]!='='
                && index!=-1)
            {
                number2 = affichage.textContent.slice(index+1,affichage.textContent.length);
                affichage.textContent = operate(parseInt(number1),operator,parseInt(number2));
                number1=operate(parseInt(number1),operator,parseInt(number2));
                affichage.textContent+= ' '+variable+' ';
                operator=variable;
                index = affichage.textContent.indexOf(variable);
            }
        }
        else if (variable=='AC')
        {
            affichage.textContent='0';
            index=-1;
            number1=0;
            number2=0;
            res.textContent='';
        }
        else if (variable=='DEL')
        {
            if (affichage.textContent!='0' && res.textContent!='Math Error' && affichage.textContent[affichage.textContent.length-2]!='=')
            {
                affichage.textContent = affichage.textContent.slice(0,affichage.textContent.length-2);
            }
        }
        else if (variable=='=')
        {
            if (affichage.textContent!='0' && res.textContent!='Math Error' && affichage.textContent[affichage.textContent.length-2]!='='
                && index!=-1)
            {
                affichage.textContent += ' '+variable + ' ';
                number2 = affichage.textContent.slice(index+2,affichage.textContent.length-3);
                res.textContent = operate(parseInt(number1),operator,parseInt(number2));
            }
            else if (index==-1 && affichage.textContent[affichage.textContent.length-2]!='=')
            {
                affichage.textContent += ' '+variable + ' ';
                number1=affichage.textContent.slice(0,affichage.textContent.length-3);
                res.textContent=number1;
            }
            else if (affichage.textContent[affichage.textContent.length-2]!='=')
            {
                res.textContent = 'Math Error';
            }
        }
    })
});