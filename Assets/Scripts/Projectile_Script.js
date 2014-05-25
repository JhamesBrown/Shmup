#pragma strict
var shotForce : int;


function Start () {
	shotForce = 300;
	rigidbody2D.AddForce(Vector3.up * shotForce);
}

function Update () {

}