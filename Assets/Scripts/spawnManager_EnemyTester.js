#pragma strict

var enemyTypetoSpawn : int;
var amountinWave : int;


var Enemy_test : GameObject;
var upSquirt : GameObject;
var chaser : GameObject;
var healthPickUp : GameObject;
static var left : int = -1;
static var right : int = 1;

function Start () {
	
	
	spawnTimer();
}

function Update () {

	

}

function spawnTimer(){
	
	yield WaitForSeconds (1);
	spawn("upSquirt", Vector2(1,-7));
	yield WaitForSeconds (1);
	spawn("upSquirt", Vector2(2,-7));
	yield WaitForSeconds (1);
	spawn("upSquirt", Vector2(3,-7));
	yield WaitForSeconds (1);
	yield WaitForSeconds (1);
	spawn("upSquirt", Vector2(1,-7));
	yield WaitForSeconds (1);
	spawn("upSquirt", Vector2(2,-7));
	yield WaitForSeconds (1);
	spawn("upSquirt", Vector2(3,-7));
	yield WaitForSeconds (1);
	waveSpawn(20, "upSquirt", 0.2);
	
	
}

function waveSpawn (amountinWave : int, type : String, spawnInterval : float) {
	for (var i : int = 0; i < amountinWave; i++) {
				spawn(type,randomX());
				yield WaitForSeconds (spawnInterval);
	}
}

function spawn(enemy : String, spawnPosition : Vector2){

	if (enemy == "test"){
		Instantiate(Enemy_test, spawnPosition, Quaternion.identity);
	}
	if (enemy == "upSquirt"){
		Instantiate(upSquirt, spawnPosition, Quaternion.identity);
	}
	if (enemy == "chaser"){
		Instantiate(chaser, spawnPosition, Quaternion.identity);
	}
	if (enemy == "healthPickUp"){
		Instantiate(healthPickUp, spawnPosition, Quaternion.identity);
	}
}

function diaglineSpawn (startPoint : int, direction : int, amountinWave : int, spawnInterval : float) {
	for (var i : int = 0; i < amountinWave && startPoint + (i*direction) < 9 && startPoint + (i*direction) > -9 ; i++) {
				Instantiate(Enemy_test, Vector2(startPoint + (i*direction),7), Quaternion.identity);
				yield WaitForSeconds (spawnInterval);
	}
}


function randomX () {
	return  Vector2(Random.Range(-8,8),7);
}
