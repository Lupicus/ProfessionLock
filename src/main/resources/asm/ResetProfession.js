var asmapi = Java.type('net.minecraftforge.coremod.api.ASMAPI')
var opc = Java.type('org.objectweb.asm.Opcodes')
var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode')

function initializeCoreMod() {
    return {
    	'ResetProfession': {
    		'target': {
    			'type': 'CLASS',
    			'name': 'net.minecraft.world.entity.ai.behavior.ResetProfession'
    		},
    		'transformer': function(classNode) {
    			var count = 0
    			var fn = asmapi.mapMethod('m_6114_') // checkExtraStartConditions
    			for (var i = 0; i < classNode.methods.size(); ++i) {
    				var obj = classNode.methods.get(i)
    				if (obj.name == fn && (obj.access & opc.ACC_SYNTHETIC) == 0) {
    					patch_m_6114_(obj)
    					count++
    				}
    			}
    			if (count < 1)
    				asmapi.log("ERROR", "Failed to modify ResetProfession: Method not found")
    			return classNode;
    		}
    	}
    }
}

// add return false
function patch_m_6114_(obj) {
	var op1 = new InsnNode(opc.ICONST_0)
	var op2 = new InsnNode(opc.IRETURN)
	var list = asmapi.listOf(op1, op2)
	obj.instructions.insert(list)
}
