#pragma strict
var duration : float = 0.4;
function Start () {
	countDown();
}

function Update () {

}

function countDown() {
	yield WaitForSeconds (duration);
	Destroy(gameObject);
}