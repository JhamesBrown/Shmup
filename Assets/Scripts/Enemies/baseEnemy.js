#pragma strict
var anim : Animator;
var health : int;
@HideInInspector var gameManager : gameManager_Script;

function Start () {
	anim = GetComponent(Animator);
	health = 20;
	gameManager = GameObject.FindGameObjectWithTag("GameManager").GetComponent(gameManager_Script);
}

function Update () {
	if (health <= 0 && collider2D != null) {
	collider2D.isTrigger = true;
		onDeath();
	}
}
function OnCollisionEnter2D (col : Collision2D) {
	
	if(col.gameObject.tag =="Projectile") {
		anim.SetInteger("state", 1);
		health -= 10;
		yield WaitForSeconds(0.3);
		anim.SetInteger("state", 0);
		return;
	}
	
	if(col.gameObject.tag =="Wall" && col != null) {
		Destroy(gameObject);
	}
}

function onDeath() {
	anim.SetInteger("state", 2);
	yield WaitForSeconds(0.5);
	Destroy(gameObject);
	gameManager.enemiesKilled ++;
}