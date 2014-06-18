#pragma strict

var enemyTypetoSpawn : int;
var amountinWave : int;
var spawnInterval : float;

var Enemy_test : GameObject;
var upSquirt : GameObject;

function Start () {
	amountinWave = 10;
	spawnInterval = 1;
}

function Update () {
	if (Input.GetKeyDown("1")) {
		waveSpawn();
	} 
}

function waveSpawn () {
	for (var i : int = 0; i < amountinWave; i++) {
				spawn("test");
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
	//spawnOnce();
}