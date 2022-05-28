window.addEventListener('DOMContentLoaded', () => {
    updateLinkName();
    closeFlash();
    updateAuthBoxes();
    copyToken();
    validateTokenApi();
    downloadLinks();
})

const body = document.querySelector('body');
const titleInput = document.querySelector('#title');
const linkTitle = document.querySelector('.link-heading')
const creationDate = document.querySelectorAll('.creation-date');
const alert = document.querySelector('.alert');
const closeMes = document.querySelector('.close');
const signinBtn = document.querySelector('.signinBtn');
const signupBtn = document.querySelector('.signupBtn');
const formBox = document.querySelector('.formBox');
const signinForm = document.querySelector('.signin-form')
const signupForm = document.querySelector('.singup-form');
const copyTokenBtn = document.querySelector('#copy');
const downloadedToken = document.querySelector('#downloaded-token');

let updateLinkName = () => {
    try {
        if(titleInput){
            titleInput.addEventListener('input', (e) => {
                linkTitle.textContent = e.target.value;
                if(linkTitle.textContent === ''){
                    linkTitle.textContent = 'Link'
                    return;
                }
            })
        }    
    } catch (error) {}
}

let frameHours  = () => {
    try {
        if(creationDate){
            creationDate.forEach((e) => {
                let date = new Date(e.textContent);
                day = date.getDate();
                month = date.getMonth() + 1;
                year = date.getFullYear();
                
                e.innerHTML = ` Created at <span>${month}/${day}/${year} </span>`;
                console.log(day, month, year);
            })
        }    
    } catch (error) {}
}

let closeFlash = () => {
    try {
        if(alert){
            setTimeout( () => {
                if(closeMes){
                    alert.style.display = 'none';     
                }
            },3000)
            
            closeMes.onclick = () => {
                alert.style.display = 'none';   
            }
        }    
    } catch (error) {
        
    }
}

let updateAuthBoxes = () => {
    try {
        signupBtn.onclick = () => {
            formBox.classList.add('active');
            body.classList.add('active');
    
            //Animations
            signinForm.classList.add('slide-left');
            signinForm.addEventListener('animationend', (e) => { 
                if(e.animationName === 'slideLeft'){
                    signinForm.style.display = 'none';
                    signupForm.style.display = 'block';
                    signupForm.classList.add('open-left');
                    signinForm.classList.remove('slide-left');
                }
            })
    
            signupForm.addEventListener('animationend', (e) => {
                if(e.animationName === 'openSlideLeft'){
                    signupForm.classList.remove('open-left');
                }
            }) 
        }
    
        signinBtn.onclick = () => {
            formBox.classList.remove('active');
            body.classList.remove('active');
            
            //Animations
            signupForm.classList.add('open-right');
    
            signupForm.addEventListener('animationend', (e) => {
                if(e.animationName === 'openSlideRight'){
                    signinForm.style.display = 'block';  
                    signupForm.style.display = 'none';
                    signinForm.classList.add('slide-right');
                    signupForm.classList.remove('open-right');
                }
            })
    
            signinForm.addEventListener('animationend', (e) => {
                if(e.animationName === 'slideRight'){
                    signinForm.classList.remove('slide-right');
                }
            })
        }
    } catch (error){}
}

let copyToken = () => {
    try {
        if(copyTokenBtn){
            copyTokenBtn.onclick = () => {
                const apiToken = document.querySelector("#api-token");
                apiToken.select();
                document.execCommand("copy");
            }
        }
    } catch (error) {}
} 

let validateTokenApi = () => {
    try {
        const tokenInput = document.querySelector('#token');
        const downloadApiBtn = document.querySelector('#downloadApi');
    
        tokenInput.addEventListener('input', (e) => {
            if(e.target.value.length < 40){
                downloadApiBtn.style.backgroundColor = "red"
            }else{
                downloadApiBtn.style.backgroundColor = "#31D843"
            }
            if(e.target.value.length < 5){
                downloadApiBtn.style.backgroundColor = "#F39237"
            }
            //Validates if this includes a token that exist and the "api" extension if it does we continue with the request otherwise we prevent the request execution
        })
    } catch (error){}    
}

//Fetch, Display, and Import 
let displayFetchedLinks = (data) => {
    try {
        data.forEach(e => {
            //Create Elements
            linkContainer = document.createElement('DIV');
            downloadedTitle = document.createElement('H3');
            downloadedDescription = document.createElement('P');
            downloadedCreationDate = document.createElement('P');
            div60 = document.createElement('DIV');
            div40 = document.createElement('DIV');
            ctnSelection = document.createElement('DIV');
            select = document.createElement('I');
            unselect = document.createElement('I');
            downloadedLink = document.createElement('A');
            
            //Add Classes and Styles
            linkContainer.classList.add('link-info', 'selected');
            downloadedTitle.classList.add('text-center');
            downloadedDescription.classList.add('link-description')
            downloadedCreationDate.classList.add('creation-date');
            ctnSelection.classList.add('ctn-selection');
            select.classList.add('fas', 'fa-check', 'select-link-btn');
            unselect.classList.add('fas','fa-times', 'unselect-link-btn');
            downloadedLink.style.color = "Black"
            downloadedCreationDate.style.paddingTop = "2rem";
            linkContainer.style.backgroundColor = "White"
            linkContainer.style.color = "Black";
        
            //Adding Content
            downloadedDescription.textContent = e.description;
            downloadedTitle.textContent = e.title;
            downloadedCreationDate.textContent = e.creationDate;
            downloadedLink.href = e.url;
            downloadedLink.target = "_blank"
    
            //Id Set
            linkContainer.dataset.idLink = e.id;    

            //Listeners
            select.onclick = selectLink;
            unselect.onclick = unselectLink;

            //Append Elements
            downloadedLink.appendChild(downloadedTitle);
            div60.appendChild(downloadedLink);
            div60.appendChild(downloadedDescription);
            div40.appendChild(downloadedCreationDate);
            ctnSelection.appendChild(unselect);
            ctnSelection.appendChild(select);
            div40.appendChild(ctnSelection);
            linkContainer.appendChild(div60);
            linkContainer.appendChild(div40);
            document.querySelector('.link-list').appendChild(linkContainer);
        })
    } catch (error) {}
}

let selectLink = (evt) => {
    try {
        const linkContainer = evt.target.parentNode.parentNode.parentNode;
    
        linkContainer.classList.remove('unselected');
        if(!linkContainer.classList.contains('selected')){
            linkContainer.classList.add('selected');
            linkContainer.style.backgroundColor = "#ffffff"
            linkContainer.style.color = "black"
        }    
    } catch (error) {}
}

let unselectLink = (evt) => {
    try {
        const linkContainer = evt.target.parentNode.parentNode.parentNode;

        linkContainer.classList.remove('selected')
        if(!linkContainer.classList.contains('unselected')){
            linkContainer.classList.add('unselected');
            linkContainer.style.backgroundColor = "#061121"
            linkContainer.style.color = "white"
        }    
    } catch (error) {}
}

async function downloadLinks(params){
    try {
        const url = downloadedToken.textContent;

        if(fetch){
            fetch(url)
            .then(response => response.json())
            .then(data => {
                if(data === "API isn't available" || data.length < 1){
                    displayAPINoAvailableMsg()
                }else{            
                    displayFetchedLinks(data);
                    importLinks(data);
                }
            })
            .catch(err => console.log(err))
        }
    } catch (error) {}
}

let displayAPINoAvailableMsg = () => {
    try {
        //Creating Elements
        const hero = document.createElement('DIV');
        const msg = document.createElement('H1');

        //Adding Classes and Content
        hero.classList.add('hero-container');
        msg.classList.add('text-center');
        msg.textContent = "This API is not available";
        
        //Append to document
        hero.appendChild(msg);
        document.querySelector('.link-list').appendChild(hero);    
    } catch (error) {}    
}

let importLinks = (data) => {
    try {
        const doneBtn = document.querySelector('.import-done');

        doneBtn.addEventListener('click', (e) => {
            let importedLinks = data;
            const unSelectedLinks = document.querySelectorAll('.unselected');
            unSelectedLinks.forEach(e => {
                const result = importedLinks.filter(link => link.id !== Number(e.dataset.idLink));
                importedLinks = result;
            })
            //Post Imported Links
            if(importedLinks.length > 1){
                const windowOrigin = window.location.origin;
                let url = `${windowOrigin}/shared/upload-links`;            
                postData(url , importedLinks);
            }else{
                console.log('No links selected')
            }
        })
    } catch (error) {}
}

let postData = (url, data) => {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if(res.ok === true && res.redirected === true){
            window.location.href = res.url;
        }
    })
    .catch(error => console.error('Error:', error))
}

