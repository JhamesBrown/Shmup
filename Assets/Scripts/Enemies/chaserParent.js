#pragma strict
var chaser_Child : Transform;
var childObject :Transform;

var target : Transform; //the enemy's target
var moveSpeed = 3; //move speed
var rotationSpeed = 1000; //speed of turning
var targetAngle : float; 
var myTransform : Transform; //current transform data of this enemy

function Start () {
	childObject = Instantiate(chaser_Child, Vector3(transform.position.x, transform.position.y ,transform.position.z), Quaternion.identity);
	childObject.transform.parent = transform;
	target = GameObject.FindWithTag("Player").transform; //target the player
}

function Update () {
	transform.LookAt (target, Vector3.forward);
}