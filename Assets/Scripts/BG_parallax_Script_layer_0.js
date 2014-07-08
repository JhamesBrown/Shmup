#pragma strict
var speed : float;
function Start () {
	speed = 0.3;

}

function Update () {
	
	transform.Translate(Vector2(0,(-1) * speed * Time.deltaTime));
}