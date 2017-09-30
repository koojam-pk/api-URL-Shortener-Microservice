document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      // document ready
      const webHost = window.location.origin;
      const list = document.getElementsByClassName('webhost');

      console.log(list);
      for (var i=0; i<list.length; i++) {
          list[i].innerHTML = list[i].innerHTML.replace('{fullUrl}', webHost);
      }
    }
};