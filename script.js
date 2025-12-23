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
function pourcentage(a,operator,b)
{
    if (operator=='+')
    {
        return a+(a*b/100);
    }
    else if (operator=='x')
    {
        return a*(a*b/100);
    }
    else if (operator=='/')
    {
        return a/(a*b/100);
    }
    else if (operator=='-'){
        return a-(a*b/100);
    }
}
function pourcentage1(a)
{
    return a/100;
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
function compteur(str,a)
{
    let cmpt=0;
    for (let i=0;i<str.length;i++)
    {
        if (str[i]==a)
        {
            cmpt++;
        }
    }
    return cmpt;
}
let variable;
let index=-1;
let temp;
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
            if (affichage.textContent!='0' && !affichage.textContent.includes("error") && affichage.textContent[affichage.textContent.length-2]!='='
                && affichage.textContent.length<=25)
            {
                if (variable=='.')
                {
                    if (affichage.textContent.includes(variable))
                    {
                        if (compteur(affichage.textContent,variable)==1 && index!=-1 && compteur(affichage.textContent.slice(index,affichage.textContent.length-1),variable)==0)
                        {
                            affichage.textContent+=variable;
                        }
                    }
                    else{
                        affichage.textContent += variable;
                    }
                }
                else{
                    affichage.textContent += variable;
                }

            }
            else if (affichage.textContent[affichage.textContent.length-2]!='=' && affichage.textContent.length<=25)
            {
                affichage.textContent = variable;
            }
            else if (affichage.textContent[affichage.textContent.length-2]=='=')
            {
                affichage.textContent=variable;
                index=-1;
                number1=0;
                number2=0;
                res.textContent='';
            }
        }
        else if (variable=='+' || variable=='-' || variable=='/' || variable=='x') 
        {
            if (!affichage.textContent.includes("error") && affichage.textContent[affichage.textContent.length-2]!='+'
                && affichage.textContent[affichage.textContent.length-2]!='-' && affichage.textContent[affichage.textContent.length-2]!='x'
                && affichage.textContent[affichage.textContent.length-2]!='/' && affichage.textContent[affichage.textContent.length-2]!='='
                && index==-1 && affichage.textContent.length<=25) 
            {
                affichage.textContent += ' '+variable + ' ';
                number1=affichage.textContent.slice(0,affichage.textContent.length-3);
                operator=variable;
                index = affichage.textContent.indexOf(variable);
            }
            else if (!affichage.textContent.includes("error") && affichage.textContent[affichage.textContent.length-2]!='+'
                && affichage.textContent[affichage.textContent.length-2]!='-' && affichage.textContent[affichage.textContent.length-2]!='x'
                && affichage.textContent[affichage.textContent.length-2]!='/' && affichage.textContent[affichage.textContent.length-2]!='='
                && index!=-1 && affichage.textContent.length<=25)
            {
                number2 = affichage.textContent.slice(index+1,affichage.textContent.length);
                if (operate(parseFloat(number1),operator,parseFloat(number2))!="error")
                {
                affichage.textContent = operate(parseFloat(number1),operator,parseFloat(number2));
                temp=operate(parseFloat(number1),operator,parseFloat(number2));
                number1=temp;
                affichage.textContent+= ' '+variable+' ';
                operator=variable;
                index = affichage.textContent.indexOf(variable);
                }
                else
                {
                    affichage.textContent = operate(parseFloat(number1),operator,parseFloat(number2));
                    number1=0;
                    number2=0;
                    index=-1;
                }
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
            if (affichage.textContent!='0' && !affichage.textContent.includes("error") && affichage.textContent[affichage.textContent.length-2]!='=' 
                && affichage.textContent[affichage.textContent.length-1]==' ')
            {
                affichage.textContent = affichage.textContent.slice(0,affichage.textContent.length-3);
                index = -1;
            }
            else if (affichage.textContent!='0' && !affichage.textContent.includes("error") && affichage.textContent[affichage.textContent.length-2]!='=')
            {
                affichage.textContent = affichage.textContent.slice(0,affichage.textContent.length-1);
            }
        }
        else if (variable=='=')
        {
            if (affichage.textContent!='0' && affichage.textContent[affichage.textContent.length-2]!='='
                && index!=-1)
            {
                affichage.textContent += ' '+variable + ' ';
                number2 = affichage.textContent.slice(index+2,affichage.textContent.length-3);
                res.textContent = operate(parseFloat(number1),operator,parseFloat(number2));
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
        else if (variable=='%')
        {
            if (affichage.textContent!='0' && !affichage.textContent.includes("error") && affichage.textContent[affichage.textContent.length-2]!='='
                && affichage.textContent[affichage.textContent.length-2]!='+'
                && affichage.textContent[affichage.textContent.length-2]!='-' && affichage.textContent[affichage.textContent.length-2]!='x'
                && affichage.textContent[affichage.textContent.length-2]!='/' && index!=-1)
            {
                affichage.textContent += ' '+variable + ' ';
                number2 = affichage.textContent.slice(index+2,affichage.textContent.length-3);
                affichage.textContent = pourcentage(parseFloat(number1),operator,parseFloat(number2));
                index=-1;
                number2=0;
            }
            else if (affichage.textContent!='0' && !affichage.textContent.includes("error") && affichage.textContent[affichage.textContent.length-2]!='='
                && affichage.textContent[affichage.textContent.length-2]!='+'
                && affichage.textContent[affichage.textContent.length-2]!='-' && affichage.textContent[affichage.textContent.length-2]!='x'
                && affichage.textContent[affichage.textContent.length-2]!='/' && index==-1)
            {
                affichage.textContent += ' '+variable + ' ';
                number1=affichage.textContent.slice(0,affichage.textContent.length-3);
                affichage.textContent = pourcentage1(parseFloat(number1));
            }
        }
    })
});