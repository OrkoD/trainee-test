function makeAjaxCall(url, methodType){
  let promise = new Promise(function(resolve, reject){
    let xhr = new XMLHttpRequest();
    xhr.open(methodType, url, true);
    xhr.send();
    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4){
        if (xhr.status === 200){
          var resp = xhr.responseText;
          var respJson = JSON.parse(resp);
          resolve(respJson);
        } else {
          reject(xhr.status);
          console.log("xhr failed");
        }
      }
    };
  });
  return promise;
}

makeAjaxCall("./db.json", "GET")
  .then(
    response => printData(response),
    error => console.log(error)
  );

let content = document.querySelector('#content');

function printData(data) {
  data.forEach((item, index) => {
    // Create content block node
    const contentBlock = document.createElement('article');
    contentBlock.className = 'content-block';

    // Create image node
    const image = document.createElement('img');
    const imgSrc = `img/${item.img}`;
    image.setAttribute('src', imgSrc);
    image.setAttribute('alt', item.img);
    image.className = 'content-img';

    // Create content body mode
    const contentBody = document.createElement('div');
    contentBody.className = `content-body content-body-${index + 1}`;

    // Create title node
    const title = document.createElement('h2');
    title.className = 'content-title';
    const titleText = document.createTextNode(item.title);
    title.appendChild(titleText);
    const linkTitle = document.createElement('a');
    linkTitle.setAttribute('href', '#');
    linkTitle.className = 'link-title';
    linkTitle.appendChild(title);

    // Create description node
    const description = document.createElement('p');
    description.className = 'content-description';
    const descriptionText = document.createTextNode(item.description);
    description.appendChild(descriptionText);

    // Create video node
    const video = document.createElement('iframe');
    video.className = 'content-video';
    video.setAttribute('src', item.video);

    // Create date node
    const splitedDate = item.date.split(' ');
    const date = document.createElement('div');
    date.className = 'content-date';
    const dateNumber = document.createElement('span');
    dateNumber.className = 'date-number';
    const dateNumberText = document.createTextNode(splitedDate[0]);
    dateNumber.appendChild(dateNumberText);
    const dateMonth = document.createElement('span');
    dateMonth.className = 'date-month';
    const dateMonthText = document.createTextNode(splitedDate[1]);
    dateMonth.appendChild(dateMonthText);
    date.appendChild(dateNumber);
    date.appendChild(dateMonth);

    contentBody.appendChild(linkTitle);
    contentBody.appendChild(description);
    if (item.video.length > 0) {
      contentBody.appendChild(video);
    }
    contentBody.appendChild(date);
    contentBlock.appendChild(image);
    contentBlock.appendChild(contentBody);
    content.appendChild(contentBlock);

  });
}

// Scroll animation
$(document).ready(() => {
  $('.arrow-down').click(() => {
    $('html, body').animate({scrollTop: $('.content-body-1').offset().top}, 1200, 'easeOutQuart');
    return false;
  });
});