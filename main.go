package main

import (
	"fmt"
	"time"
)

// ANSIエスケープシーケンスの定数
const (
	Reset     = "\x1b[0m"
	Bold      = "\x1b[1m"
	Underline = "\x1b[4m"
	Inverse   = "\x1b[7m" // 前景色と背景色の反転

	Black       = "\x1b[30m"
	Red         = "\x1b[31m"
	Green       = "\x1b[32m"
	Yellow      = "\x1b[33m"
	Blue        = "\x1b[34m"
	Magenta     = "\x1b[35m"
	Cyan        = "\x1b[36m"
	White       = "\x1b[37m"
	BrightBlack = "\x1b[90m" // グレー

	BgBlack   = "\x1b[40m"
	BgRed     = "\x1b[41m"
	BgGreen   = "\x1b[42m"
	BgYellow  = "\x1b[43m"
	BgBlue    = "\x1b[44m"
	BgMagenta = "\x1b[45m"
	BgCyan    = "\x1b[46m"
	BgWhite   = "\x1b[47m"
)

func typeWriterEffect(text string, delay time.Duration, decorationCodes ...string) {
	// 指定された装飾コードを結合して適用
	for _, code := range decorationCodes {
		fmt.Print(code)
	}

	for _, char := range text {
		fmt.Print(string(char))
		time.Sleep(delay)
	}
	fmt.Println(Reset)
}

func main() {
	text1 := "Hello I'm nove-b🦥"
	text2 := "🏠　神奈川県の真ん中"
	text3 := "📫　nove.b.web@gmail.com"
	text4 := "🐙　https://github.com/nove-b"
	text5 := "💡　https://blog.nove-b.dev/"
	text6 := "🐘　https://social.nove-b.dev/@nove_b"
	text7 := "Thanks for watching!"
	delay := 60 * time.Millisecond
	fmt.Println()
	typeWriterEffect(text1, delay, Yellow)
	fmt.Println()
	typeWriterEffect("-----------------------------", delay, Yellow)
	fmt.Println()
	typeWriterEffect(text2, delay, Yellow)
	typeWriterEffect(text3, delay, Yellow)
	typeWriterEffect(text4, delay, Yellow)
	typeWriterEffect(text5, delay, Yellow)
	typeWriterEffect(text6, delay, Yellow)
	fmt.Println()
	typeWriterEffect("-----------------------------", delay, Yellow)
	fmt.Println()
	typeWriterEffect(text7, delay, Yellow)

}
