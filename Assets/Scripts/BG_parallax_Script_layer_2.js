#pragma strict
var speed : float;
function Start () {
	speed = 0.8;

}

function Update () {
	
	transform.Translate(Vector2(0,(-1) * speed * Time.deltaTime));
}