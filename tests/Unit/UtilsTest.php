<?php

namespace Tests\Unit;

use Tests\UnitLogabbleTestCase as TestCase;
use App\Utils;

class UtilsTest extends TestCase
{
    /**
     * Tests if isOrdered() function works.
     *
     * @return void
     */
    public function testIsOrdered()
    {
        $testOrderedArr         = [3 => 'a', 4 => 'b', 5 => 'c'];
        $testUnOrderedArr       = [3 => 'a', 6 => 'b', 7 => 'd'];
        $testUnOrderedArrDesc   = [6 => 'a', 5 => 'b', 4 => 'c'];

        $this->assertTrue(Utils::isOrdered($testOrderedArr));
        $this->assertFalse(Utils::isOrdered($testUnOrderedArr));
        $this->assertFalse(Utils::isOrdered($testUnOrderedArrDesc));
    }

    /**
     * Tests if filter() function works.
     *
     * @return void
     */
    public function testFiltersArrayValuesOrdered()
    {
        $lessThanFour = fn ($value) => $value < 4;

        $array = [2,3,4,5,6,7];
        $arrayBig = [55, 53,12,355];
        $values = Utils::filter($array, $lessThanFour);
        $this->log($values);
        $this->assertTrue(Utils::isOrdered($values));
        $values = Utils::filter($arrayBig, $lessThanFour);
        $this->log($values);
        $this->assertFalse((bool) count($values));
    }

    /**
     * Tests if indexesOf() function works.
     *
     * @return void
     */
    public function testIndexesOfFunction()
    {
        $array = [5, 4,2,6,5,4];
        $indexes = Utils::indexesOf($array, fn($v) => $v < 3);
        $this->log($indexes);
        $this->log($array);
        $this->assertEquals($indexes[0], 2);
    }

    /**
     * Tests if replaceFirstSegment() function works.
     *
     * @return void
     */
    public function testReplaceFirstSegment()
    {
        $path = '/my/cute/path';
        $newPath = Utils::replaceFirstSegment($path, 'new', fn($v) => $v == 'cute');
        $this->log($path);
        $this->log($newPath);
        $this->assertEquals($newPath, '/my/new/path');

        $path = '/';
        $result = Utils::replaceFirstSegment($path, 'new', fn($v) => $v == 'cute');
        $newPath = $result ?? $path;
        $this->log($path);
        $this->log($newPath);
        $this->assertNull($result);
        $this->assertEquals($newPath, $path);
    }

    public function testFuncValidateUrl()
    {
        $ValidURL = "https://www.w3schools.com";
        $result = Utils::validateURL($ValidURL);
        $this->assertIsString($result);

        $InvalidURL = "https:d//www.w3schools.com";
        $result = Utils::validateURL($InvalidURL);
        $this->assertNull($result);
    }

    public function testFuncPath()
    {
        $url = "https://www.w3schools.com/tutorials";
        $path = Utils::path($url);

        $this->log($path);
        $this->assertEquals($path, '/tutorials');
    
        $url = "https://www.w3schools.com";
        $path = Utils::path($url);

        $this->log($path);
        $this->assertEquals($path, '/');


    }
    public function testFuncSanitizeUrl()
    {
        $url = "https://www.w3schoóls.com/tutorials";
        $sanitized = Utils::sanitizeURL($url);
        $this->log($sanitized);
        $this->assertIsString($sanitized);
        $this->assertStringContainsString('w3schols', $sanitized);
    }
}