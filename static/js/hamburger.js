function menuDrop(){
    var nbar = document.getElementById('ndrop');
    var tgt = document.getElementById('mobile-menu')
    tgt.appendChild(nbar)
    if(nbar.className === 'menu'){
        nbar.className += ' expand';
    }
    else{
        nbar.className = 'menu';
    }
}

function menuToggle(){
    var nbar = document.getElementById('ndrop');
    if(nbar.className === 'menu'){
        nbar.className += ' expand';
    }
    else{
        nbar.className = 'menu';
    }
}

function switchTab(ev, target, tabclass){
    var i
    const ACTIVE = " active"
    const TAB = "tab "
    const TABCONTENT = "tabcontent "

    var tabcontent = document.getElementsByClassName(TABCONTENT + tabclass);
    for( i = 0; i < tabcontent.length; i++ ){
        tabcontent[i].style.display = "none";
    }

    var tabs = document.getElementsByClassName(TAB + tabclass)
    for( i = 0; i < tabs.length; i++ ){
        tabs[i].className = TAB + tabclass
    }

    document.getElementById(target).style.display = "block";
    ev.currentTarget.className += ACTIVE
}

function restorePic(ev) {
    ev.currentTarget.style.display = 'none'
}

function expandPic(ev, target) {
    var trigger = ev.currentTarget
    var te = document.getElementById(target)
    te.style.display = 'block'
    var bigPic = te.getElementsByTagName('img')[0]
    bigPic.setAttribute('src', trigger.getAttribute('src'))

}
