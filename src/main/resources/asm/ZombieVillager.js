var asmapi = Java.type('net.minecraftforge.coremod.api.ASMAPI')
var opc = Java.type('org.objectweb.asm.Opcodes')
var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode')

function initializeCoreMod() {
	return {
		'ZombieVillager': {
			'target': {
				'type': 'CLASS',
				'name': 'net.minecraft.entity.monster.ZombieVillagerEntity'
			},
			'transformer': function(classNode) {
				var count = 0
				var fn = asmapi.mapMethod('func_213791_a') // cureZombie
				for (var i = 0; i < classNode.methods.size(); ++i) {
					var obj = classNode.methods.get(i)
					if (obj.name == fn) {
						patch_func_213791_a(obj)
						count++
					}
				}
				if (count < 1)
					asmapi.log("ERROR", "Failed to modify ZombieVillager: Method not found")
				return classNode;
			}
		}
	}
}

// add resetBrain call
function patch_func_213791_a(obj) {
	var fn = asmapi.mapMethod('func_213753_a') // setVillagerData
	var owner = "net/minecraft/entity/merchant/villager/VillagerEntity"
	var node = asmapi.findFirstMethodCall(obj, asmapi.MethodType.VIRTUAL, owner, fn, "(Lnet/minecraft/entity/merchant/villager/VillagerData;)V")
	if (node) {	
		var fn2 = asmapi.mapMethod('func_213770_a') // resetBrain
		var desc = "(Lnet/minecraft/world/server/ServerWorld;)V"
		var op1 = new VarInsnNode(opc.ALOAD, 2) // villager
		var op2 = new VarInsnNode(opc.ALOAD, 1) // ServerWorld
		var op3 = asmapi.buildMethodCall(owner, fn2, desc, asmapi.MethodType.VIRTUAL)
		var list = asmapi.listOf(op1, op2, op3)
		obj.instructions.insert(node, list)
	}
	else
		asmapi.log("ERROR", "Failed to modify ZombieVillager: set not found")
}
