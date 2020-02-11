//ACHTUNG: VOR DEM AUSFÜHREN POPUP BLOCKER DEAKTIVIEREN
//EMPFEHLUNG: Vor dem Ausführen Browser auf Autodownload setzen

var links = document.getElementsByTagName("a");
var vidLinks = [];
for (var i = 0; i < links.length; i++) {
//################Hier zu suchenden String eingeben (muss in allen Video Links enthalten sein)###########
//Für Vorlesung PSE: "sitzung"
    if (links[i].innerText.toLowerCase().includes("pse hu")) {
        vidLinks.push(links[i]);
    }
}

var newWindow = null;
var num = 0;
var lnk = vidLinks[num];
var vidList = [];
var nameList = [];

function downloadAll() {
    var elem = document.getElementById("headerimage");
    for (var i = 0; i < vidList.length; i++) {
        var vid = vidList[i];
        var l = document.createElement("a");
        l.href=vid;
        l.download = nameList[i];
        elem.appendChild(l);
        l.click();
    }
}

function next() {
    var vids = newWindow.document.getElementsByTagName("video");
    for (var i = 0; i < vids.length; i++) {
        vidList.push(vids[i].src);
//############Hier Dateiname für Zieldatei eingeben##################
//Für Vorlesung PSE: "Vorlesung" + lnk.innerText.substr(60,2) + "_" + i + ".mp4"
        nameList.push("Uebung" + lnk.innerText.substr(6,2) + "_" + i + ".mp4");
    }
    newWindow.close();
    num++;
    if (num < vidLinks.length) {
        lnk = vidLinks[num];
        newWindow = window.open(lnk.href);
        newWindow.opener = this.window;
        setTimeout(next, 10000);
    } else {
        console.log(vidList);
        downloadAll();
    }
}

newWindow = window.open(lnk.href);
newWindow.opener = this.window;
setTimeout(next, 10000);