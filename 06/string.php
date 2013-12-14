<?php
echo strlen("0123456789"); // 10
echo "\n";
echo strlen("零一二三四五六七八九"); // 30
echo "\n";
echo mb_strlen("零一二三四五六七八九", "utf-8"); //10
echo "\n";
?>
