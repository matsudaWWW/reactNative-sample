#pragma once

#include "MainPage.g.h"



namespace winrt::Calculator::implementation
{
    struct MainPage : MainPageT<MainPage>
    {
        MainPage();

    private:
      void LoadReact();
    };
}

namespace winrt::Calculator::factory_implementation
{
    struct MainPage : MainPageT<MainPage, implementation::MainPage>
    {
    };
}


