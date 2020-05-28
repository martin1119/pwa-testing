fetch('https://api.github.com/users/google/repos')
  .then((res) => {
    res.json().then((json) => {
      console.log(json);
    });
  })
  .catch((err) => {
    console.log(err);
  });

fetch('./template.html')
  .then((res) => {
    res.text().then((text) => {
      document.getElementById('body').innerHTML = text;
      console.log(text);
    });
  })
  .catch((err) => {
    console.log(err);
  });
