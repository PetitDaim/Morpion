let bestPlace = new Array();
let coupG = false;
let dernierCoup = false;
let levelSelect = document.getElementById("level");
let level = parseInt(levelSelect.value);
let finished=false;
let ordinateurAGagne = false;
let joueurAGagne = false;
let ordinateur = 0;
let commenceur=document.getElementById("commenceur");
let comm = parseInt(commenceur.value);
let joueur=comm;
let coups=0;
let coupsXO = new Array();
coupsXO.push( new Array() );
coupsXO.push( new Array() );
let message = document.querySelector("#message");
let carres = document.querySelectorAll(".carre");
function coupGagnant( m, M, dc, j ) {
    let cpGagnant = false;
    switch( m ){
        case 1:
            switch( M ) {
                case 2:
                    cpGagnant = 3;
                    break;
                case 3:
                    cpGagnant = 2;
                    break;
                case 4:
                    cpGagnant = 7;
                    break;
                case 5:
                    cpGagnant = 9;
                    break;
                case 7:
                    cpGagnant = 4;
                    break;
                case 9:
                    cpGagnant = 5;
                    break;
                default:
                    break;
            }
            break;
        case 2:
            switch( M ) {
                case 3:
                    cpGagnant = 1;
                    break;
                case 5:
                    cpGagnant = 8;
                    break;
                case 8:
                    cpGagnant = 5;
                    break;
                default:
                    break;
            }
            break;
        case 3:
            switch( M ) {
                case 5:
                    cpGagnant = 7;
                    break;
                case 6:
                    cpGagnant = 9;
                    break;
                case 7:
                    cpGagnant = 5;
                    break;
                case 9:
                    cpGagnant = 6;
                    break;
                default:
                    break;
            }
            break;
        case 4:
            switch( M ) {
                case 5:
                    cpGagnant = 6;
                    break;
                case 6:
                    cpGagnant = 5;
                    break;
                case 7:
                    cpGagnant = 1;
                    break;
                default:
                    break;
            }
            break;
        case 5:
            switch( M ) {
                case 6:
                    cpGagnant = 4;
                    break;
                case 7:
                    cpGagnant = 3;
                    break;
                case 8:
                    cpGagnant = 2;
                    break;
                case 9:
                    cpGagnant = 1;
                    break;
                default:
                    break;
            }
            break;
        case 6:
            switch( M ) {
                case 9:
                    cpGagnant = 3;
                    break;
                default:
                    break;
            }
            break;
        case 7:
            switch( M ) {
                case 8:
                    cpGagnant = 9;
                    break;
                case 9:
                    cpGagnant = 8;
                    break;
                default:
                    break;
            }
            break;
        case 8:
            switch( M ) {
                case 9:
                    cpGagnant = 7;
                    break;
                default:
                    break;
            }
        default:
            break;
    }
    if( cpGagnant ) {
        let carre = document.getElementById("carre-"+cpGagnant);
        if( carre.innerHTML !== "" ) {
            coupG = cpGagnant;
            cpGagnant=false;
        }
    }
    if( dc != 5 ) {
        avantDernierCoup = dernierCoup;
        dernierCoup = dc;
    }
    console.log( "coupGagnant( " + m + ", " + M + " ) = " + cpGagnant );
    return parseInt(cpGagnant);
}
function propose( c, levmm=true, lres=0, coupGnt=0 ) {
    if( document.getElementById("carre-"+c).innerHTML == "" ) {
        if( lev >= (level-lres) ) {
            bestPlace.push(c);
            if( ( c == 5 ) || ( c == coupGnt ) )
            {
                bestPlace.push(c);
                bestPlace.push(c);
                bestPlace.push(c);
            }
            if( levmm )
            {
                lev--;
                // return 0;
            }
            if( lev >= (level-lres) )
            {
                console.log("lev="+lev);
                return 1;
            }
        }
    }
    console.log("lev="+lev);
    return 0;
}

function findWhereToPlay()
{
    console.log( "coup : " + coups + " du joueur: "+ joueur );
    refreshLevels();
    bestPlace = new Array();
    let res=0;
    if( coups <= 2 ) {
        res = propose( 5 );
        switch( dernierCoup )
        {
            case 1:
            case 3:
            case 7:
            case 9:
                res = propose( 10-dernierCoup );
                break;
            default:
                res = propose( 1, true, res );
                break;
        }
        res = propose( 9, false, res );
        res = propose( 3, false, res );
        res = propose( 7, false, res );
        res = propose( 2, true );
        res = propose( 4, false, res );
        res = propose( 6, false, res );
        res = propose( 8, false, res );
        let ind = Math.trunc(Math.random()*parseInt(bestPlace.length));
        console.log( ind );
        return bestPlace[ind];
    }
    else if( coups >= 3 ) {
        for( j in [joueur, 1-joueur] ) {
            for( c1 = 0; c1 < parseInt((coups-(1-j)-comm)/2); c1++ ) {
                for( c2 = c1+1; c2 <= parseInt((coups-(1-j)-comm)/2); c2++ ) {
                    let pc = coupsXO[j][c1];
                    let dc = coupsXO[j][c2];
                    let m = Math.min( pc, dc );
                    let M = Math.max( pc, dc );
                    refreshLevels();
                    let cpGagnant = coupGagnant( m, M, dc, j );
                    if( cpGagnant ) {
                        res = propose( cpGagnant, true, 0, cpGagnant );
                        res = propose( 5 );
                        res = propose( 1 );
                        res = propose( 3, false, res );
                        res = propose( 7, false, res );
                        res = propose( 9, false, res );
                        res = propose( 2, true );
                        res = propose( 4, false, res );
                        res = propose( 6, false, res );
                        res = propose( 8, false, res );
                        let ind = Math.trunc(Math.random()*parseInt(bestPlace.length));
                        console.log( ind );
                        if( ( ind == 0 ) && ( j == 0 ) )
                        {
                            finished = true;
                            ordinateurAGagne = true;
                            console.log( "Finished: " + cpGagnant );
                        }
                        console.log( "Meilleur coup n°" + ind );
                        return bestPlace[ind];
                    }
                }
            }
        }
        refreshLevels();
        res = propose( 5 );
        res = propose( 1 );
        res = propose( 3, false, res );
        res = propose( 7, false, res );
        res = propose( 9, false, res );
        res = propose( 2, true );
        res = propose( 4, false, res );
        res = propose( 6, false, res );
        res = propose( 8, false, res );
        let ind = Math.trunc(Math.random()*parseInt(bestPlace.length));
        console.log( "Meilleur coup n°" + ind );
        return bestPlace[ind];
    }
    // else console.log( "coup = " + coup );
}

function ordinateurJoue()
{
    refreshLevels();
    message.innerHTML = "It's "+((joueur==1)?"X":"O")+" turn !";
    if( ( joueur == 0 ) && ( coups < 9 ) && ( ! finished ) ) {
        let wtp = findWhereToPlay();
        console.log(  "Au coup : " + coups + " le joueur : " + joueur + " joue: " + wtp );
        let carre = document.getElementById("carre-"+wtp);
        carre.classList.add('O');
        carre.innerHTML = "O";
        let cpGagnantOrdinateur = parseInt((carre.id).replace( "carre-",''));
        console.log( "Ordinateur joue: " + cpGagnantOrdinateur );
        coupsXO[0].push( parseInt(cpGagnantOrdinateur) );
        joueur = 1 - joueur;
        coups++;
        if( ( ! finished ) && ( coups < 9 ) ) message.innerHTML = "It's "+((joueur==1)?"X":"O")+" turn !";
        else finished = true;
    }
}

carres.forEach( function( value, key, parent) {
    value.addEventListener("click", function(event) {
        if( coups == 9 )  finished = true;
        else if( value.classList.contains('X') || value.classList.contains('O') ) message.innerHTML = "Impossible to play here !" ;
        else if( ! finished ) {
            if( joueur == 1 ) {
                console.log( "coup : " + coups + " du joueur: "+ joueur );
                value.classList.add('X');
                if( coups >= 4 ) {
                    let cpGagnant = false;
                    for( c1 = 0; c1 < parseInt((coups-joueur-comm)/2); c1++ ) {
                        for( c2 = c1+1; c2 <= parseInt((coups-joueur-comm)/2); c2++ ) {
                            let pc = coupsXO[joueur][c1];
                            let dc = coupsXO[joueur][c2];
                            let m = Math.min( pc, dc );
                            let M = Math.max( pc, dc );
                            cpGagnant = coupGagnant( m, M, dc, joueur );
                            console.log( "cpGagnant : " + cpGagnant + " key+1: "+ ( parseInt( key ) + 1 ) );
                            if( cpGagnant == ( parseInt( key ) + 1 ) ) {
                                joueurAGagne = true;
                                finished = true;
                                c=parseInt((coups-(joueur)-comm)/2);
                            }
                        }
                    }
                }
                value.innerHTML = "X";
                coupsXO[1].push(parseInt(key)+1);
                console.log( "Au coup : " + coups + " le joueur : " + joueur + " joue : " + (parseInt(key)+1) );
            }
            joueur = 1 - joueur;
            coups++;
            if( finished || ( coups == 9 ) ) {
                finished = true;
            }
            else {
                ordinateurJoue();
            }
        }
        if( finished ) message.innerHTML = "Finish !";
        if( joueurAGagne ) message.innerHTML = "Vous avez gagné !";
        else if( ordinateurAGagne ) message.innerHTML = "L'ordinateur a gagné !";
    }, false );
}, this );

function refreshLevels()
{
    level = parseInt(levelSelect.value);
    maxLevel = 3;
    lev = maxLevel;
    console.log("level="+level);
    console.log("maxLevel="+maxLevel);
    console.log("lev="+lev);
}

function refreshLevelsAndDernierCoups()
{
    refreshLevels();
    coupG = false;
    dernierCoup = false;
}

function doRejouer() {
    console.log( "Rejouer !" );
    refreshLevelsAndDernierCoups();
    ordinateurAGagne = false;
    joueurAGagne = false;
    finished=false;
    comm=parseInt(commenceur.value);
    joueur=comm;
    coups=0;
    coupsXO = new Array();
    coupsXO.push( new Array() );
    coupsXO.push( new Array() );
    carres.forEach( function( value, key, parent) {
        if( value.classList.contains('X') ) value.classList.remove('X');
        if( value.classList.contains('O') ) value.classList.remove('O');
        value.innerHTML = "";
    });
    if( joueur == 0 ) ordinateurJoue();
}

let rejouer = document.getElementById( "rejouer" );
rejouer.addEventListener("click", (event) => {
    doRejouer();
}, false );

commenceur.addEventListener("change", (event) => {
    doRejouer();
}, false );

// let cj = document.getElementById("commenceurJoueur");
// cj.addEventListener( "click", (event) => {
//     doRejouer();
// }, false );

// let co = document.getElementById("commenceurOrdinateur");
// co.addEventListener( "click", (event) => {
//     doRejouer();
// }, false );

levelSelect.addEventListener("change", (event) => {
    refreshLevels();
}, false );
