document.addEventListener('DOMContentLoaded', function() {
  const api = 'https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php';
  
  const playData = JSON.parse(content);

  const radios = document.querySelectorAll('input[name=sort]');

  listPlays(playData, "by_name");

  const playsByDate = [...playData];
  sortByDate(playsByDate);
  listPlays(playsByDate, "by_date");
  
  for (let rd of radios) {
    rd.addEventListener("change", function (e) {
      if (rd.id == "name_radio") {
        hideList("#by_date");
        showList("#by_name");
      }
      else {
        hideList("#by_name");
        showList("#by_date");
      }
    });
  }
  
  const plays = document.querySelector("#playList ul");
  plays.addEventListener("click", function (e) {
    if (e.target && e.target.nodeName == "LI") {
      const play = playData.find(p => p.id === e.target.dataset.id);
      displayInfo(play);
    }
  });

  /* 
  To-do: implement Play Test view, credits & styling for play selection/website as a whole
  */
});
/*
 To get a specific play, add play's id property (in plays.json) via query string, 
   e.g., url = url + '?name=hamlet';
 
 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=hamlet
 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=jcaesar
 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=macbeth
 
 NOTE: Only a few plays have text available. If the filename property of the play is empty, 
 then there is no play text available.
*/
 

function listPlays(plays, sort_id) {
  const list = document.querySelector("#playList ul");
  for (let p of plays) {
    const li = document.createElement("li");
    li.setAttribute("id", sort_id)
    li.setAttribute("data-id", p.id);
    li.textContent = p.title;
    list.appendChild(li);
  }
}

function hideList(list_id) {
  const list = document.querySelectorAll(list_id);
  for (let ls of list) {
    ls.style.display = "none";
  }
}

function showList(list_id) {
  const list = document.querySelectorAll(list_id);

  for (let ls of list) {
    ls.style.display = "block";
  }
}

function sortByDate(plays) {
  plays.sort(function (a,b) {
    if (a.likelyDate < b.likelyDate) {
      return -1;
    }
    else if (a.likelyDate > b.likelyDate) {
      return 1;
    }
    else {
      return 0;
    }
  })
}

function displayInfo(play) {
  const title = document.querySelectorAll("h2");
  for (ttl of title) {
    ttl.textContent = play.title;
  }

  const synopsis = document.querySelector("aside p").textContent = play.synopsis;

  const date = document.querySelector("#date").textContent = play.likelyDate;

  const genre = document.querySelector("#genre").textContent = play.genre;

  const wiki = document.querySelector("#wiki");
  wiki.setAttribute("href", play.wiki);
  wiki.textContent = play.wiki;

  const gutenberg = document.querySelector("#gutenberg");
  gutenberg.setAttribute("href", play.gutenberg);
  gutenberg.textContent = play.gutenberg;

  const shakespeare_org = document.querySelector("#shakespeare_org");
  shakespeare_org.setAttribute("href", play.shakespeareOrg);
  shakespeare_org.textContent = play.shakespeareOrg;

  const description = document.querySelector("#description").textContent = play.desc;
  
  const btn = document.querySelector("#btnPlayText");
  if (play.filename == "") {
    btn.style.display = "none";
  }
  else {
    btn.style.display = "block";
  }
}