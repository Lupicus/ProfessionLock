package com.lupicus.proflock;

import net.minecraftforge.fml.IExtensionPoint.DisplayTest;
import net.minecraftforge.fml.ModLoadingContext;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fmllegacy.network.FMLNetworkConstants;

@Mod(Main.MODID)
public class Main
{
	public static final String MODID = "proflock";

	public Main()
	{
		ModLoadingContext.get().registerExtensionPoint(DisplayTest.class,
				() -> new DisplayTest(() -> FMLNetworkConstants.IGNORESERVERONLY, (a, b) -> true));
	}
}
