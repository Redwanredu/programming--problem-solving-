def test_solution():
    tests = [
        # 1 island
        ([["1","1","1","1","0"],
          ["1","1","0","1","0"],
          ["1","1","0","0","0"],
          ["0","0","0","0","0"]], 1),
        
        # 3 islands
        ([["1","1","0","0","0"],
          ["1","1","0","0","0"],
          ["0","0","1","0","0"],
          ["0","0","0","1","1"]], 3),
        
        # No land
        ([["0"]], 0),
        
        # Single land
        ([["1"]], 1),
        
        # All land (1 island)
        ([["1","1"],
          ["1","1"]], 1),
        
        # Diagonal doesn't count
        ([["1","0"],
          ["0","1"]], 2),
        
        # Empty grid
        ([], 0),
    ]
    
    for grid, expected in tests:
        # Deep copy since solutions mutate the grid
        import copy
        g1 = copy.deepcopy(grid)
        g2 = copy.deepcopy(grid)
        g3 = copy.deepcopy(grid)
        
        r1 = num_islands(g1)
        r2 = num_islands_bfs(g2)
        r3 = num_islands_union_find(g3)
        
        status = "✓" if r1 == r2 == r3 == expected else "✗"
        print(f"{status} Expected: {expected} | DFS: {r1} | BFS: {r2} | UF: {r3}")


if __name__ == "__main__":
    test_solution()