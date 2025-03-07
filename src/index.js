import "./styles.css"

async function getData(searchTerm){
    const data = await fetch(`http://api.weatherapi.com/v1/current.json?q=${searchTerm}&key=ad0279dcca6349fd89200407250503`, {mode:'cors'});

    const info = await data.json()
    console.log(info)
    return  info;
}

function clean(info){

    try{
        return {
            condition : info.current.condition.text,
            humidity: info.current.humidity,
            localTime:  info.location.localtime,
            temp:  info.current.temp_c,
    
        }
    }catch{
        return {
            error: info.error.message
        }
    }

}

const searchField = document.querySelector('#country');
const button = document.querySelector('#search');
const form = document.querySelector('form');
const img = document.querySelector('img');
form.classList.add('display');

button.addEventListener('click',async()=>{
    img.src = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmp3czZqM25nemJrM2MwbmpmeWI1YWtzNXBsZTFpejd6dXUwN3A5cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sSgvbe1m3n93G/giphy.gif'
    let value = searchField.value;
    const data = clean(await getData(value));

    searchField.remove();
    button.remove();
    document.querySelector('label').remove()

    await new Promise(r => setTimeout(r, 2000));
    let i = ''
    img.src = ''

    for(i in data){
        console.log(i)
        const p = document.createElement('p');
        switch(i){
            case 'condition': p.textContent ='condition: '+ data[i];
            break
            case 'humidity': p.textContent ='humidity: '+ data[i];
            break
            case 'localTime': p.textContent ='Date and time: '+ data[i];
            break
            case 'temp': p.textContent ='temp: '+ data[i];
            break
            case 'error': p.textContent = 'error: '+ data[i]

        }
        form.append(p)
        form.classList.add('finished');

    }
    
    
    
})

