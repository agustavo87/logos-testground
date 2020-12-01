<?php
class A
{
    public function number()
    {
        return 6;
    }

    public function myFn($n)
    {
        $a = fn($b) => $b + $this->number();
        return $a($n);
    }
}


$myA = new A();
echo $myA->myFn(4);