<?php

// autoload_real.php @generated by Composer

class ComposerAutoloaderInit20ad4bbc36fc1777a907ba839d00f02a
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        require __DIR__ . '/platform_check.php';

        spl_autoload_register(array('ComposerAutoloaderInit20ad4bbc36fc1777a907ba839d00f02a', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInit20ad4bbc36fc1777a907ba839d00f02a', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInit20ad4bbc36fc1777a907ba839d00f02a::getInitializer($loader));

        $loader->register(true);

        return $loader;
    }
}