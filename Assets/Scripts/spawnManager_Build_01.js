#pragma strict

var enemyTypetoSpawn : int;
var amountinWave : int;
var spawnInterval : float;

var Enemy_test : GameObject;
var upSquirt : GameObject;
var chaser : GameObject;
var healthPickUp : GameObject;

function Start () {
	
	spawnInterval = 1.0;
	spawnTimer();
}

function Update () {

	

}

function spawnTimer(){
	yield WaitForSeconds (2);
	spawn("test");
	yield WaitForSeconds (4);
	waveSpawn(5,"chaser");
	yield WaitForSeconds (3);
	spawn("test");
	yield WaitForSeconds (4);
	waveSpawn(2,"upSquirt");
	yield WaitForSeconds (5);
	spawn("healthPickUp");
	
	yield WaitForSeconds (2);
	spawn("test");
	yield WaitForSeconds (4);
	waveSpawn(5,"chaser");
	yield WaitForSeconds (3);
	spawn("test");
	yield WaitForSeconds (4);
	waveSpawn(2,"upSquirt");
	yield WaitForSeconds (5);
	spawn("healthPickUp");
	
}

function waveSpawn (amountinWave : int, type : String) {
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