var asmapi = Java.type('net.minecraftforge.coremod.api.ASMAPI')
var opc = Java.type('org.objectweb.asm.Opcodes')
var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode')

function initializeCoreMod() {
	return {
		'ZombieVillager': {
			'target': {
				'type': 'CLASS',
				'name': 'net.minecraft.world.entity.monster.ZombieVillager'
			},
			'transformer': function(classNode) {
				var count = 0
				var fn = asmapi.mapMethod('m_34398_') // finishConversion
				for (var i = 0; i < classNode.methods.size(); ++i) {
					var obj = classNode.methods.get(i)
					if (obj.name == fn) {
						patch_m_34398_(obj)
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

// add refreshBrain call
function patch_m_34398_(obj) {
	var fn = asmapi.mapMethod('m_141967_') // setVillagerData
	var owner = "net/minecraft/world/entity/npc/Villager"
	var node = asmapi.findFirstMethodCall(obj, asmapi.MethodType.VIRTUAL, owner, fn, "(Lnet/minecraft/world/entity/npc/VillagerData;)V")
	if (node) {	
		var fn2 = asmapi.mapMethod('m_35483_') // refreshBrain
		var desc = "(Lnet/minecraft/server/level/ServerLevel;)V"
		var op1 = new VarInsnNode(opc.ALOAD, 2) // villager
		var op2 = new VarInsnNode(opc.ALOAD, 1) // ServerLevel
		var op3 = asmapi.buildMethodCall(owner, fn2, desc, asmapi.MethodType.VIRTUAL)
		var list = asmapi.listOf(op1, op2, op3)
		obj.instructions.insert(node, list)
	}
	else
		asmapi.log("ERROR", "Failed to modify ZombieVillager: set not found")
}
