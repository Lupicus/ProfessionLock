package com.lupicus.proflock;

import org.apache.commons.lang3.tuple.Pair;

import net.minecraftforge.fml.ExtensionPoint;
import net.minecraftforge.fml.ModLoadingContext;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import net.minecraftforge.fml.network.FMLNetworkConstants;

@Mod(Main.MODID)
public class Main
{
	public static final String MODID = "proflock";

	public Main()
	{
		FMLJavaModLoadingContext.get().getModEventBus().register(this);
		ModLoadingContext.get().registerExtensionPoint(ExtensionPoint.DISPLAYTEST,
				() -> Pair.of(() -> FMLNetworkConstants.IGNORESERVERONLY, (a,b) -> true));
	}
}