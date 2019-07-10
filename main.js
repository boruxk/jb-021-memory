// choose field and start
function loadGame() {
    var a;
    var t;
    if (document.getElementById("g2").checked) {
        a = 2;
        t = 0.25;
        document.getElementById("field").setAttribute("class", "g2");
    } else if (document.getElementById("g4").checked) {
        a = 4;
        t = 2;
        document.getElementById("field").setAttribute("class", "g4");
    }else if (document.getElementById("g6").checked) {
        a = 6;
        t = 5;
        document.getElementById("field").setAttribute("class", "g6");
    } else if (document.getElementById("g8").checked) {
        a = 8;
        t = 8;
        document.getElementById("field").setAttribute("class", "g8");
    } else if (document.getElementById("g10").checked) {
        a = 10;
        t = 10;
        document.getElementById("field").setAttribute("class", "g10");
    } else {
        swal({
            title: "Choose field size",
            icon: "error",
            button: "OK",
        }).then(() => {
            location.reload()
        });
    }
    startGame(a, t);
}

function startGame(a, t) {

    //restart game
    document.getElementById("btn-restart").addEventListener("click", function () { location.reload(); });

    // create random number array with 1 repitition 
    function arr(a) {
        var arr = [];
        while (arr.length < a * a / 2) {
            var num = Math.round(Math.random() * ((a * a / 2) - 1));
            if (arr.indexOf(num) === -1) {
                arr.push(num);
            }
        }
        return arr;
    }
    var arr1 = arr(a);
    var arr2 = arr(a);
    var gameArr = arr1.concat(arr2);

    // shuffle the field
    function shuffle(gameArr) {
        return gameArr.sort(() => Math.random() - 0.5);
    }
    gameArray = shuffle(gameArr);
    console.log(gameArray);

    //random color arr
    function colorArr(a) {
        var colorArr = [];
        while (colorArr.length < a * a / 2) {
            var r = Math.floor(Math.random() * 150);
            var g = Math.floor(Math.random() * 150);
            var b = Math.floor(Math.random() * 150);
            var color = "rgb(" + r + "," + g + "," + b + ")";
            if (colorArr.indexOf(color) === -1) {
                colorArr.push(color);
            }
        }
        return colorArr;
    }
    var colorArr1 = colorArr(a);
    var colorArr2 = colorArr(a);
    var gameColorArray = colorArr1.concat(colorArr2);

    // replace numbers with font-awesome icons and attach the color
    var iconArray = [
        "fa-crow", "fa-music", "fa-globe", "fa-car", "fa-tree", "fa-cat", "fa-wrench", "fa-heart", "fa-star", "fa-dog",
        "fa-dove", "fa-feather-alt", "fa-fish", "fa-frog", "fa-horse", "fa-spider", "fa-bell", "fa-radiation", "fa-microphone", "fa-play-circle",
        "fa-motorcycle", "fa-truck", "fa-balance-scale", "fa-basketball-ball", "fa-bath", "fa-bicycle", "fa-biohazard", "fa-birthday-cake", "fa-star-of-david", "fa-bomb",
        "fa-bone", "fa-bolt", "fa-book", "fa-bowling-ball", "fa-bug", "fa-building", "fa-bullhorn", "fa-campground", "fa-carrot", "fa-cocktail",
        "fa-coffee", "fa-cogs", "fa-crown", "fa-gem", "fa-ghost", "fa-glasses", "fa-globe-americas", "fa-key", "fa-menorah", "fa-plane"
    ];
    for (i = 0; i < gameArray.length; i++) {
        icon = "<i class='fas " + iconArray[gameArray[i]] + "' style='color:" + gameColorArray[gameArray[i]] + "'></i>";
        gameArray.splice(i, 1, icon);
    }

    // create cells and put icons in cells
    for (i = 0; i < gameArray.length; i++) {
        var divElement = document.createElement('div');
        divElement.setAttribute('id', 'd' + i);
        divElement.innerHTML = "<div class='hidden'>" + gameArray[i] + "</div>";
        document.getElementById('field').appendChild(divElement);
    }

    // unhide cell (move)
    for (var i = 0; i < (gameArray.length); i++) {
        document.getElementById("d" + i).addEventListener("click", gameMove);
        document.getElementById("d" + i).style.cursor = "pointer";
    }

    //show time
    var currentdate = new Date();
    var hours = currentdate.getHours();
    var minutes = currentdate.getMinutes();
    var seconds = currentdate.getSeconds();
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    var datetime = " Game start at: " + hours + ":" + minutes + ":" + seconds;
    document.getElementById("time").innerHTML = datetime;

    //start timer to the end of game   
    var endInMinutes = 60 * t;
    var display = document.querySelector('#time2');
    startTimer(endInMinutes, display);   

    //activate game
    document.getElementById("game").style.visibility = "visible";
    document.getElementById("menu").style.visibility = "visible";
    document.getElementById("btn-restart").style.visibility = "visible";
    document.getElementById("timer").style.visibility = "visible";

    //hide unnecessary stuff after started
    var hide = document.getElementById("choose").style;
    hide.visibility = "hidden";
    hide.width = "0px";
    hide.height = "0px";
    hide.overflow = "hidden";

    //start game
    tempArr = [];
    winArr = [];
    function gameMove() {
        elId = this.id;

        //win
        function win() {
            winArr.push(tempArr[0]);
            winArr.push(tempArr[1]);
            if (winArr.length == (a * a)) {
                swal({
                    title: "Good job!",
                    text: "You won the game!",
                    icon: "success",
                    button: "Start new game",
                }).then(() => {
                    location.reload()
                });
            };
            console.log(winArr);
            tempArr = [];
        }

        //hide
        function hide(){
            document.getElementById(tempArr[0]).innerHTML = document.getElementById(tempArr[0]).innerHTML.replace(/unhide/g, "hidden");
            document.getElementById(tempArr[1]).innerHTML = document.getElementById(tempArr[1]).innerHTML.replace(/unhide/g, "hidden");
            tempArr = [];
        }

        //addListener
        function addListener() {
            allHidden = document.getElementsByClassName("hidden");
            for (i = 0; i < allHidden.length; i++) {
                allHidden[i].parentElement.addEventListener("click", gameMove);
                allHidden[i].parentElement.style.cursor = "pointer";
            }
        }

        //removeListener
        function removeListener() {
            allUnHidden = document.getElementsByClassName("unhide");
            for (i = 0; i < allUnHidden.length; i++) {
                allUnHidden[i].parentElement.removeEventListener("click", gameMove);
                allUnHidden[i].parentElement.style.cursor = "default";
            }
        }

        //move and prevent bugs
        function gameMoveFast() {

            //disable listener
            removeListener();

            //move
            document.getElementById(elId).innerHTML = document.getElementById(elId).innerHTML.replace(/hidden/g, "unhide");
            tempArr.push(elId);

            //prevent push the same twice
            if (tempArr[0] == tempArr[1]) {
                hide();
            }           

            //prevent push more then 2
            if (tempArr.length > 2) {
                document.getElementById(tempArr[2]).innerHTML = document.getElementById(tempArr[2]).innerHTML.replace(/unhide/g, "hidden");
                if (document.getElementById(tempArr[0]).innerHTML != document.getElementById(tempArr[1]).innerHTML) {
                    hide();
                } 
                
                //prevent third click if cell1 == cell2 and win
                else if (document.getElementById(tempArr[0]).innerHTML == document.getElementById(tempArr[1]).innerHTML) {
                    win();
                }
            }
            //inable listener
            addListener();

            //disable listener
            removeListener();
        }

        // check after second unhide if cell1 == cell2, if not - hide
        function gameMoveSlow() {

            //disable listener
            removeListener();

            // wrong move -> hide
            if (tempArr.length == 2 && document.getElementById(tempArr[0]).innerHTML != document.getElementById(tempArr[1]).innerHTML) {
                hide();
            } 
            
            //win
            else if (tempArr.length == 2 && document.getElementById(tempArr[0]).innerHTML == document.getElementById(tempArr[1]).innerHTML) {
                win();
            }

            //inable listener
            addListener();

            //disable listener
            removeListener();
        }
        window.setTimeout(gameMoveFast, 10);
        window.setTimeout(gameMoveSlow, 2000);
        console.log(tempArr);
    }
}

//timer to the end of game, if ended - lost
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.innerHTML = "<span style='color:rgb(0, 97, 255); font-width:bold; font-size: 28px;'>" + minutes + ":" + seconds + "</span>";
        if (seconds < 30 && minutes == 0) {
            display.innerHTML = "<span style='color:rgb(255, 0, 0); font-width:bold; font-size: 28px;'>" + minutes + ":" + seconds + "</span>";
        }
        if (--timer < 0) {
            swal({
                title: "YOU LOST!",
                icon: "error",
                button: "Start new game",
            }).then(() => {
                    location.reload();
            });
        }
    }, 1000);
}
