#pragma strict

var enemyTypetoSpawn : int;
var amountinWave : int;


var Enemy_test : GameObject;
var upSquirt : GameObject;
var chaserParent : GameObject;
var wobble : GameObject;
var healthPickUp : GameObject;
static var left : int = -1;
static var right : int = 1;
enum enemyType { test, upSquirt, chaser, wobble, healthPickUp}
var enemy;

function Start () {
	
	
	spawnTimer();
}

function Update () {

	

}

function spawnTimer(){
	
	yield WaitForSeconds (5);
	diaglineSpawn(enemyType.test,-7,right, 10, 1.2);
	
	yield WaitForSeconds (5);
	diaglineSpawn(enemyType.test,7,left, 10, 1.2);
	
	yield WaitForSeconds (5);
	diaglineSpawn(enemyType.upSquirt,7,left, 10, 1.2);
	
	yield WaitForSeconds (5);
	spawn(enemyType.chaser, randomX());
	spawn(enemyType.healthPickUp, randomX());
	
	yield WaitForSeconds (10);
	diaglineSpawn(enemyType.wobble,7,left, 10, 1.2);
	
	yield WaitForSeconds (5);
	spawn(enemyType.chaser, randomX());
	spawn(enemyType.healthPickUp, randomX());
	
	yield WaitForSeconds (10);
	diaglineSpawn(enemyType.wobble,-7,right, 10, 1.2);
	
	yield WaitForSeconds (10);
	diaglineSpawn(enemyType.upSquirt,-7,right, 10, 1.2);
	
	yield WaitForSeconds (5);
	spawn(enemyType.chaser, randomX());
	spawn(enemyType.healthPickUp, randomX());
	
	yield WaitForSeconds (5);
	spawn(enemyType.chaser, randomX());
	spawn(enemyType.healthPickUp, randomX());
	
	yield WaitForSeconds (5);
	diaglineSpawn(enemyType.test,-7,right, 10, 1.2);
	
	yield WaitForSeconds (5);
	diaglineSpawn(enemyType.test,7,left, 10, 1.2);
	
	yield WaitForSeconds (5);
	diaglineSpawn(enemyType.test,-7,right, 10, 1.2);
	
	yield WaitForSeconds (5);
	diaglineSpawn(enemyType.test,7,left, 10, 1.2);
	
	yield WaitForSeconds (5);
	diaglineSpawn(enemyType.upSquirt,7,left, 10, 1.2);
	
	yield WaitForSeconds (5);
	spawn(enemyType.chaser, randomX());
	spawn(enemyType.healthPickUp, randomX());
	
	yield WaitForSeconds (10);
	diaglineSpawn(enemyType.wobble,7,left, 10, 1.2);
	
	yield WaitForSeconds (5);
	spawn(enemyType.chaser, randomX());
	spawn(enemyType.chaser, randomX());
	spawn(enemyType.healthPickUp, randomX());
	
	yield WaitForSeconds (10);
	spawn(enemyType.chaser, randomX());
	diaglineSpawn(enemyType.wobble,-7,right, 10, 1.2);
	
	yield WaitForSeconds (10);
	spawn(enemyType.chaser, randomX());
	diaglineSpawn(enemyType.upSquirt,-7,right, 10, 1.2);
	
	yield WaitForSeconds (5);
	spawn(enemyType.chaser, randomX());
	spawn(enemyType.chaser, randomX());
	spawn(enemyType.healthPickUp, randomX());
	
	yield WaitForSeconds (5);
	spawn(enemyType.chaser, randomX());
	spawn(enemyType.chaser, randomX());
	spawn(enemyType.healthPickUp, randomX());
	
	yield WaitForSeconds (5);
	diaglineSpawn(enemyType.test,-7,right, 10, 1.2);
	
	yield WaitForSeconds (5);
	diaglineSpawn(enemyType.test,7,left, 10, 1.2);
	
	
	
	
}

function waveSpawn (amountinWave : int, type : int, spawnInterval : float) {
	for (var i : int = 0; i < amountinWave; i++) {
				spawn(type,randomX());
				yield WaitForSeconds (spawnInterval);
	}
}

function spawn(enemy : int, spawnPosition : Vector2){

	switch(enemy) {
		case enemyType.test:
			Instantiate(Enemy_test, spawnPosition, Quaternion.identity);
			break;
			
		case enemyType.upSquirt:
			Instantiate(upSquirt, spawnPosition, Quaternion.identity);			
			break;
			
		case enemyType.chaser:
			Instantiate(chaserParent, spawnPosition, Quaternion.identity);			
			break;
			
		case enemyType.wobble:
			Instantiate(wobble, spawnPosition, Quaternion.identity);			
			break;
			
		case enemyType.healthPickUp:
			Instantiate(healthPickUp, spawnPosition, Quaternion.identity);			
			break;	
	}
	
}

function diaglineSpawn (enemyType:int, startPoint : int, direction : int, amountinWave : int, spawnInterval : float) {
	for (var i : int = 0; i < amountinWave && startPoint + (i*direction) < 9 && startPoint + (i*direction) > -9 ; i++) {
	
				spawn(enemyType, Vector2(startPoint + (i*direction),7));
				
				
				yield WaitForSeconds (spawnInterval);
	}
}


function randomX () {
	return  Vector2(Random.Range(-8,8),7);
}
