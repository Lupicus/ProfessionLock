var asmapi = Java.type('net.minecraftforge.coremod.api.ASMAPI')
var opc = Java.type('org.objectweb.asm.Opcodes')
var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode')

function initializeCoreMod() {
    return {
    	'ChangeJobTask': {
    		'target': {
    			'type': 'CLASS',
    			'name': 'net.minecraft.entity.ai.brain.task.ChangeJobTask'
    		},
    		'transformer': function(classNode) {
    			var count = 0
    			var fn = asmapi.mapMethod('func_212832_a_') // shouldExecute
    			for (var i = 0; i < classNode.methods.size(); ++i) {
    				var obj = classNode.methods.get(i)
    				if (obj.name == fn && (obj.access & opc.ACC_SYNTHETIC) == 0) {
    					patch_func_212832_a(obj)
    					count++
    				}
    			}
    			if (count < 1)
    				asmapi.log("ERROR", "Failed to modify ChangeJobTask: Method not found")
    			return classNode;
    		}
    	}
    }
}

// add return false
function patch_func_212832_a(obj) {
	var op1 = new InsnNode(opc.ICONST_0)
	var op2 = new InsnNode(opc.IRETURN)
	var list = asmapi.listOf(op1, op2)
	obj.instructions.insert(list)
}
