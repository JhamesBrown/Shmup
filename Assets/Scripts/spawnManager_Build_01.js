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
	yield WaitForSeconds (2);
	diaglineSpawn(-8,right,17,0.5);
	yield WaitForSeconds (9);
	diaglineSpawn(8,left,17,0.5);
	yield WaitForSeconds (9);
	diaglineSpawn(8,left,17,0.5);
	diaglineSpawn(-8,right,17,0.5);
	
	
	
	
//spawn("test");
//	spawn("healthPickUp");

//	waveSpawn(5,"healthPickUp",0.2);
//	waveSpawn(2,"upSquirt",0.2);



	
}

function waveSpawn (amountinWave : int, type : String, spawnInterval : float) {
	for (var i : int = 0; i < amountinWave; i++) {
				spawn(type);
				yield WaitForSeconds (spawnInterval);
	}
}

function spawn(enemy : String){

	if (enemy == "test"){
		Instantiate(Enemy_test, Vector2(Random.Range(-8,8),7), Quaternion.identity);
	}
	if (enemy == "upSquirt"){
		Instantiate(upSquirt, Vector3(8,8,0), Quaternion.Euler(Vector3(0,0,-45)));
	}
	if (enemy == "chaser"){
		Instantiate(chaser, Vector2(Random.Range(-8,8),7), Quaternion.identity);
	}
	if (enemy == "healthPickUp"){
		Instantiate(healthPickUp, Vector2(Random.Range(-8,8),7), Quaternion.identity);
	}
}

function diaglineSpawn (startPoint : int,direction : int, amountinWave : int, spawnInterval : float) {
	for (var i : int = 0; i < amountinWave && startPoint + (i*direction) < 9 && startPoint + (i*direction) > -9 ; i++) {
				Instantiate(Enemy_test, Vector2(startPoint + (i*direction),7), Quaternion.identity);
				yield WaitForSeconds (spawnInterval);
	}
}

