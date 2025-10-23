package configs

import (
    "fmt"
    "os"
    "strings"
    "time"

    "github.com/spf13/viper"
)

func Init() {
    initConfigLoader()
    initTimeZone()
}

func initConfigLoader() {
    viper.SetConfigName("config")
    viper.SetConfigType("yml")
    viper.AddConfigPath(".")
    viper.AutomaticEnv()
    viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))

    viper.ReadInConfig()
}

func initTimeZone() {
    ict, err := time.LoadLocation("Asia/Bangkok")
    if err != nil {
    fmt.Printf("Error: %v\n", err)
    os.Exit(1)
    }
    time.Local = ict
}
