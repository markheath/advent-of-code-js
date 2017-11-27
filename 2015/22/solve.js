let utils = require("../../utils/utils");

// my solution with random spell chooser: http://markheath.net/post/advent-of-code-day22
// this simpler JavaScript version inspired by https://www.reddit.com/r/adventofcode/comments/3xspyl/day_22_solutions/cy7swgm/

function solve(input, part) {
    let bossH = 58; // hit points
    let bossAt = 9; // boss attack
    
    let costMissile = 53;
    let costDrain = 73;
    let costPoison = 173;
    let costShield = 113;
    let costRecharge = 229;
    
    const heroH = 50;
    const heroMana = 500;
    
    let heroAr = 0;
    let cost = 0;
    
    let poison = 0;
    let recharge = 0;
    let shield = 0;
    
    let boss;
    let hero;
    let mana;
    
    let answer = 9999999;
    for(let i = 0; i < 3000000; i++) {
        if(fight()) {
            answer = Math.min(answer, cost);
            //console.log(answer);
        }
    }
    return answer;

    
    function choose()
    {
        if(mana < costPoison) {
            return "nothing";
        }

        while(true) {
            let next = Math.floor(Math.random() * 5);
            if (next == 0 && mana >= costMissile) {
                return "missile";
            }
            else if (next == 1 && mana >= costDrain) {
                return "drain";
            }
            else if (next == 2 && mana >= costPoison) {
                return "poison";
            }
            else if (next == 3 && mana >= costRecharge) {
                return "recharge";
            }
            else if (next == 4 && mana >= costShield) {
                return "shield";
            }
        }
    }

    function fight() {
        let turn = true;
        let type = "nothing";

        hero = heroH;
        boss = bossH;
        mana = heroMana;
        cost = 0;
        poison = 0;
        recharge = 0;
        shield = 0;

        while (true) {
            if(poison > 0) {
                poison--;
                boss -= 3;
            }

            if(recharge > 0) {
                recharge--;
                mana += 101;
            }

            if(shield > 0) {
                shield--;
            }

            if(shield == 0) {
                heroAr = 0;
            }

            if (boss <= 0) {
                return true;
            }

            if (hero <= 0) {
                return false;
            }

            if (turn) {
                if (part === 2) {
                    // hard mode
                    hero--;
                }
                if(hero <= 0) {
                    return false;
                }

                type = choose();
                if (type == "nothing") {
                    return false;
                }

                if(type == "drain") {
                    boss -= 2;
                    hero += 2;
                    cost += costDrain;
                    mana -= costDrain;
                }
                else if (type == "missile") {
                    boss -= 4;
                    cost += costMissile;
                    mana -= costMissile;
                }
                else if (type == "poison") {
                    poison = 6;
                    cost += costPoison;
                    mana -= costPoison;
                }
                else if (type == "recharge") {
                    recharge = 5;
                    cost += costRecharge;
                    mana -= costRecharge;
                }
                else if (type == "shield") {
                    shield = 6;
                    heroAr = 7;
                    cost += costShield;
                    mana -= costShield;
                }
            }
            else {
                hero -= Math.max(1, bossAt - heroAr);
            }
            turn = !turn;
        }
    }
}

function expected(part) {
    return part == 1 ? 1269 : 1309;
}


module.exports = {solve,expected};